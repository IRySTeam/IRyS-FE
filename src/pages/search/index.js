import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import EmptyQuery from '@/component/search/empty-query';
import EmptySearch from '@/component/search/empty-search';
import SuccessSearch from '@/component/search/success-search';
import { documentList } from '@/data/documents';
import { repositoryList } from '@/data/repositories';
import { getRepoListSuccess } from '@/state/actions/repositoryActions';
import { getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';

export default function Search() {
  const theme = useTheme();
  const router = useRouter();
  const { q, category} = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(q? q: '');
  const [categoryQuery, setCategoryQuery] = useState(category? category : 'repo');
  const repositoryData = useSelector(state => state.repository);
  const singleRepositoryData = useSelector(state => state.singleRepository);

  useEffect(() => {
    setIsLoading(true);
    const { q, category} = router.query
    setSearchQuery(q? q: '')
    setCategoryQuery(category? category : 'repo')

    const filterArrayRepo = (array) => {
      const searchFilter = !q ? array : array.filter((repo) => repo.name.toLowerCase().includes(q.toLowerCase()))
      const visibilityFilter = searchFilter.filter((repo) => (repo.visibility === 'public'))
      return visibilityFilter
    }

    setTimeout(() => {
      if(category === 'repo' || !category){
        const result = {
          repositories : filterArrayRepo(repositoryList),
          isEmpty : false,
        }
        dispatch(getRepoListSuccess(result))
      } else{
        const result = {
          documents: filterArrayRepo(documentList),
          isEmpty : false,
        }
        dispatch(getSingleRepoSuccess(result))
      }
      setIsLoading(false);
    }, 1000);
  }, [dispatch, router]);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          { q && (( categoryQuery === 'repo' && repositoryData.repositories.length === 0) || ( categoryQuery === 'docs' && singleRepositoryData.documents.length === 0)) &&
            <EmptySearch
              query={searchQuery} 
              category={categoryQuery}
            />
          }
          { q && (( categoryQuery === 'repo' && repositoryData.repositories.length > 0) || ( categoryQuery === 'docs' && singleRepositoryData.documents.length > 0)) &&
            <SuccessSearch
              query={searchQuery} 
              category={categoryQuery}
              data={categoryQuery === 'repo' ? repositoryData.repositories : singleRepositoryData.documents}
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
