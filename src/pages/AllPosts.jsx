import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';


function AllPosts() {
    const [posts, setPosts] = useState([])
    const userId=useSelector((state)=>state.auth.userData.$id)
    // console.log(userId)
    useEffect(() => {
        if(userId)
        appwriteService.getPosts([Query.equal("userId",userId)]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    const msg="No post to show "
  
    // console.log(posts)
  return (posts.length>0)?(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  ):(
    <div className='w-full py-8 px-2'>
    <Container>
        <div className='flex flex-wrap text-white text-xl font-bold'>
           {msg}
        </div>
        </Container>
</div>
  )
}

export default AllPosts