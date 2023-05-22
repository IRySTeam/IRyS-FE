import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import EmptyQuery from '@/component/search/empty-query';
import EmptySearch from '@/component/search/empty-search';
import SuccessSearch from '@/component/search/success-search';
import { documentList } from '@/data/documents';
import { getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';
import { getPublicRepoListSuccess } from '@/state/actions/publicRepositoryActions';
import { removeEmptyFilters } from '@/utils/array';
import { getSearchDocumentPublicFailed, getSearchDocumentPublicSuccess } from '@/state/actions/searchDocumentPublicActions';

export default function Search() {
  const theme = useTheme();
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.down('small'));
  const small = useMediaQuery(theme.breakpoints.down('desktop'));
  const { q, category, page} = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(page? page : 1);
  const [searchQuery, setSearchQuery] = useState(q? q: '');
  const [categoryQuery, setCategoryQuery] = useState(category? category : 'repo');
  const publicRepositoryData = useSelector(state => state.publicRepository);
  const filterDocument = useSelector(state => state.filter);
  const searchDocumentPublicData = useSelector(state => state.searchDocumentPublic);

  useEffect(() => {
    setIsLoading(true);
    const { q, category, page} = router.query
    setSearchQuery(q? q: '')
    setCategoryQuery(category? category : 'repo')
    setPagination(page ? page : 1)

    const token =  Cookies.get('access_token');

    const fetchRepo = async () =>  {
      
      const data = {
        name: q,
        page_no: page? page : 1,
        page_size: mobile ? 5 : tablet? 6: small? 6: 9,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/public`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(getPublicRepoListSuccess(response.data))
      } catch (error){
        //
      }
    }

    const fetchSearchDocumentBasic = async () =>  {
      const data = {
        query: filterDocument.mode === 'basic' ? filterDocument.keyword : filterDocument.cliQuery,
        domain: filterDocument.domain,
        advanced_filter: {
          match: filterDocument.mode === 'basic' ? removeEmptyFilters(filterDocument.filters) : [],
        }
      }
      try {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/search/public`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(getSearchDocumentPublicSuccess(response.data))
        setIsLoading(false);
      } catch (error){
        dispatch(getSearchDocumentPublicFailed(error.response.data))
        setIsLoading(false);
      }
    }

    const fetchSearchDocumentFile = async () =>  {
      const data = new FormData();
      data.append('file', filterDocument.file)
      const params = {
        domain: filterDocument.domain
      }
      try {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/search/public/file`, data, {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        dispatch(getSearchDocumentPublicSuccess(response.data))
        setIsLoading(false);
      } catch (error){
        dispatch(getSearchDocumentPublicFailed(error.response.data))
        setIsLoading(false);
      }
    }

    if(category === 'repo' || !category){
      fetchRepo()
    } else{
      if(filterDocument.mode === 'basic' || filterDocument.mode === 'cli' ){
        fetchSearchDocumentBasic()
      }else if(filterDocument.mode === 'file' ) {
        fetchSearchDocumentFile()
      }
    }
    setIsLoading(false);
  }, [dispatch, filterDocument, mobile, router, small, tablet]);

  const handleChangePage = (event, value) => {
    setPagination(value);
    router.push({ pathname: '/search', query: { q : searchQuery, category: categoryQuery, page: value} })
  };

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          { q && (( categoryQuery === 'repo' && publicRepositoryData.total_items === 0) || ( categoryQuery === 'docs' && searchDocumentPublicData.count === 0)) &&
            <EmptySearch
              query={searchQuery} 
              category={categoryQuery}
            />
          }
          { q && (( categoryQuery === 'repo' && publicRepositoryData.total_items > 0) || ( categoryQuery === 'docs' && searchDocumentPublicData.count > 0)) &&
            <SuccessSearch
              query={searchQuery} 
              category={categoryQuery}
              data={categoryQuery === 'repo' ? publicRepositoryData.repositories : searchDocumentPublicData.documents}
              page={pagination}
              onChangePage={handleChangePage}
              total_page={categoryQuery === 'repo' ? publicRepositoryData.total_page : 1}
            />
          }
          { !q &&  
            <EmptyQuery 
              query={searchQuery}
              setQuery={setSearchQuery}
              category={categoryQuery}
            />
          }
        </> 
      }
    </>
  )
}
