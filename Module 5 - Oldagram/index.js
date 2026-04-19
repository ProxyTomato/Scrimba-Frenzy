const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

let postElm = document.getElementById("post");
console.log(postElm);

function postTemplate(info){
    return `
    <div class="post">
    <div class="post-header">
                <img class="avatar-profile" src="${info.avatar}" alt="avatar profile">
                <div class="post-description">
                    <h1>${info.name}</h1>
                    <h2>${info.location}</h2>
                </div>
            </div>
            <div class="post-content">
                <img src="${info.post}" alt="">
            </div>
            <div class="post-icon-section">
                <img class="heart" src="images/icon-heart.png" alt="heart icon">
                <img class="comment" src="images/icon-comment.png" alt="comment icon">
                <img class="dm" src="images/icon-dm.png" alt="dm icon">
            </div>
            <div class="like-display">${info.likes} likes</div>
            <div class="post-comment-section">
                <strong>${info.username}</strong> ${info.comment}
            </div>
          </div>
    `
}
for(let i  =0; i < posts.length; i++){
    postElm.innerHTML += postTemplate(posts[i]);
}