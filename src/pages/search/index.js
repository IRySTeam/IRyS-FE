import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import EmptyQuery from '@/component/search/empty-query';
import EmptySearch from '@/component/search/empty-search';
import SuccessSearch from '@/component/search/success-search';
import { documentList } from '@/data/documents';
import { getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';
import { getPublicRepoListSuccess } from '@/state/actions/publicRepositoryActions';

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
  const repositoryData = useSelector(state => state.publicRepository);
  const singleRepositoryData = useSelector(state => state.singleRepository);

  useEffect(() => {
    setIsLoading(true);
    const { q, category, page} = router.query
    setSearchQuery(q? q: '')
    setCategoryQuery(category? category : 'repo')
    setPagination(page ? page : 1)

    const filterArrayRepo = (array) => {
      const searchFilter = !q ? array : array.filter((repo) => repo.name.toLowerCase().includes(q.toLowerCase()))
      const visibilityFilter = searchFilter.filter((repo) => (repo.visibility === 'public'))
      return visibilityFilter
    }

    const fetchRepo = async () =>  {
      const token =  Cookies.get('access_token');
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
        console.log(error)
      }
    }
    if(category === 'repo' || !category){
      fetchRepo()
    } else{
      setTimeout(() => {
        const result = {
          documents: filterArrayRepo(documentList),
          isEmpty : false,
        }
        dispatch(getSingleRepoSuccess(result))
      }, 1000);
    }
    setIsLoading(false);
  }, [dispatch, mobile, router, small, tablet]);

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
          { q && (( categoryQuery === 'repo' && repositoryData.total_items === 0) || ( categoryQuery === 'docs' && singleRepositoryData.documents.length === 0)) &&
            <EmptySearch
              query={searchQuery} 
              category={categoryQuery}
            />
          }
          { q && (( categoryQuery === 'repo' && repositoryData.total_items > 0) || ( categoryQuery === 'docs' && singleRepositoryData.documents.length > 0)) &&
            <SuccessSearch
              query={searchQuery} 
              category={categoryQuery}
              data={categoryQuery === 'repo' ? repositoryData.repositories : singleRepositoryData.documents}
              page={pagination}
              onChangePage={handleChangePage}
              total_page={categoryQuery === 'repo' ? repositoryData.total_page : 1}
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
