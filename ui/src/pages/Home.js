import React from 'react';
// import { Link } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <MenuBar />
            {/* <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link to='/signin'>Login</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Register</Link>
                    </li>
                </ul>
            </nav> */}
        </div>
    );
}

export default Home;

// example

// import { useQuery } from '@apollo/react-hooks';
// import { Grid, Transition } from 'semantic-ui-react';

// import { AuthContext } from '../context/auth';
// import PostCard from '../components/PostCard';
// import PostForm from '../components/PostForm';
// import { FETCH_POSTS_QUERY } from '../util/graphql';

// function Home() {
//   const { user } = useContext(AuthContext);
//   const {
//     loading,
//     data: { getPosts: posts }
//   } = useQuery(FETCH_POSTS_QUERY);

//   return (
//     <Grid columns={3}>
//       <Grid.Row className="page-title">
//         <h1>Recent Posts</h1>
//       </Grid.Row>
//       <Grid.Row>
//         {user && (
//           <Grid.Column>
//             <PostForm />
//           </Grid.Column>
//         )}
//         {loading ? (
//           <h1>Loading posts..</h1>
//         ) : (
//           <Transition.Group>
//             {posts &&
//               posts.map((post) => (
//                 <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
//                   <PostCard post={post} />
//                 </Grid.Column>
//               ))}
//           </Transition.Group>
//         )}
//       </Grid.Row>
//     </Grid>
//   );
// }
