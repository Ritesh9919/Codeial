// {

//     // method to submit the form data for new post using ajax
//     const createPost = () => {
//         const newPostForm = $('#new-post-form');
//         newPostForm.submit((e) => {
//             e.preventDefault();
//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 data: newPostForm.serialize(),
//                 success: function (data) {
//                     console.log(data);
//                     let newPost = createPostDom(data.data.post);
//                     $('#post-list-container>ul').prepend(newPost);

//                 }, error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     // method to create post in dom
//     const createPostDom = (post) => {
//         return $(`
//         <li id="post-${post._id}">
//     <p>
        
//             <small>
//                 <a class="post-delete-btn" href="/posts/destroy/${post._id}">X</a>
//             </small>
            
// <li>
//     ${post.content} <br>
//         <small>
//             ${post.user.name}
//         </small>
// </li>
// </p>
// <div class="post-comment">
    
//         <form action="/comments/create" method="POST">
//             <input type="text" name="content" placeholder="Add comment here..." />
//             <input type="hidden" name="post" value="${post._id}" />
//             <input type="submit" value="Add Comment" />
//         </form>
        
//             <div class="post-comment-list">
//                 <ul class="post-comments-${post._id}">
                    
                       

//                 </ul>
//             </div>

// </div>
// </li>
//         `)
//     }

//     createPost();
// }