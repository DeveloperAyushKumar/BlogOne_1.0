import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';


function AllPosts() {
    const [posts, setPosts] = useState([])
    const userId=useSelector((state)=>state.auth.userData.$id)
    console.log(userId)
    useEffect(() => {
        appwriteService.getPosts([Query.equal("userId",userId)]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    // console.log(posts)
  return (
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
  )
}

export default AllPosts