import {removePostByID, getPostByPosterID, createPost} from '../../actions/postActions'

export function getPosts(context) {
    getPostByPosterID(context.state.clubInfo._id).then((result) => {
        if(result.status){
            if(result.status === 401){
                alert('Your session has timed out. Please log back in.')
            }
            else{
                alert('Something went wrong.')
            }
            return
        }
        let sortedPosts = result
        sortedPosts = sortedPosts.sort(function(a, b){
            let dateA = new Date(a.date), dateB = new Date(b.date)
            return dateB - dateA;
        })

        context.setState({
            posts: sortedPosts,
            loaded: true
        })
    }).catch((error) => {
        console.log("Fatal error")
        throw new Error(error)
    })
}

export function removePost(context, postID) {
    let newPosts = context.state.posts
    let target = -1
    for (let i = 0; i < newPosts.length; i++) {
        if (newPosts[i]._id === postID) {
            target = i;
            break;
        }
    }

    if (target >= 0) {
        newPosts.splice(target, 1)
        removePostByID(postID).then((result) => {
            if (result === 200) {
                context.setState({
                    posts: newPosts
                })
            } 
            else if(result === 401){
                alert('Your session has timed out. Please log back in.')
                context.props.history.push('/')
            }
            else {
                console.log(`There was a problem removing the post. Status: ${result}`)
                alert(`An error occurred, status: ${result}`)
                context.props.history.push('/')
            }
        }).catch((error) => {
            console.log("Fatal error")
            throw new Error(error)
        })
    }
}

export function addPost(context, postContent) {
    let newPosts = context.state.posts
    createPost(context.state.clubInfo._id, postContent).then((result) => {
        return result
    }).then((result) => {
        if (result.status) {
            if(result.status === 401){
                alert('Your session has timed out. Please log back in.')
                context.props.history.push('/')
            }
            else{
                console.log(`There was a problem adding a post. Status: ${result.status}`)
                alert(`An error occurred, status: ${result}`)
                context.props.history.push('/')
            }
            
        } else {
            newPosts.splice(0, 0, result)
            context.setState({
                posts: newPosts
            })
        }
    }).catch((error) => {
        console.log("Fatal error.")
        console.log(error)
        throw new Error(error);
    })
}

export function onClickAddPost(context, e) {
    e.preventDefault();
    let form = e.target;
    e.target.value = ""

    // where button is clicked may change parents, use while loop
    while (form && form.id !== "makePost") {
        form = form.parentNode;
    }

    if (!form) {
        alert("Something went wrong.");
        return;
    }

    form = form.children[1].children[0]

    if (form.value.length === 0) {
        alert("Please enter post text.");
        return;
    }

    addPost(context, form.value);
}
