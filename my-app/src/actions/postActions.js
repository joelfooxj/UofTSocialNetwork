/*
 * This file contains actions relating to manipulating post data. For more extensive
 * documentation, please look at the APIDocumentation.md file 
*/

/*
 * Wrapper for creating a new post.
 */
async function createPost(posterID, content, title=undefined, location=undefined) {
    const url = '/posts/create'
    const data = {
        posterID: posterID,
        content: content
    }

    if (title) {
        data.title = title
    }

    if (location) {
        data.location = location;
    }

    // TODO: hangle images (if we get to that)

    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const response = await fetch(request)
        if (response.status === 200) {
            return await response.json()
        } else {
            return {'status': response.status}
        }
    } catch (error) {
        throw new Error(error)
    }
}

/*
 * Wrapper for getting all posts
 */
async function getAllPosts() {
    const url = '/posts/all'
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        if (response.status === 200) {
            return await response.json()
        } else {
            return []
        }
    } catch (error) {
        throw new Error(error)
    }
}

/*
 * Wrapper for getting a post based on a single poster id.
 * returns an array
 */
async function getPostByPosterID(posterID){
    const url = `/posts/get/${posterID}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        if (response.status === 200) {
            return await response.json()
        }
        else if(response.status === 401){
            return {"status": response.status}
        } 
        else {
            return []
        }
    } catch (error) {
        throw new Error(error);
    }
}

/*
 * Function for getting all posts for a set of ids
 */
async function collectPosts(ids) {
    let posts = []
    for (let i = 0; i < ids.length; i++) {
        let postsForID = await getPostByPosterID(ids[i])
        let idList = new Set(posts.map(o => o._id))
        let newPosts = [...posts, ...postsForID.filter(o => !idList.has(o._id))]
        posts = newPosts
    }
    return posts;
}

/*
 * Wrapper for deleting a post.
 */
async function removePostByID(id) {
    const url = `/posts/remove/${id}`
    const request = new Request(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        return response.status
    } catch (error) {
        throw new Error(error);
    }
}

/*
 * Wrapper for updating a post.
 */
async function updatePost(id, updateField, updateContent) {
    const url = `/posts/update/${id}`
    const data = {
        attr: updateField,
        nVal: updateContent
    }

    const request = new Request(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const response = await fetch(request)
        return response.status
    } catch (error) {
        throw new Error(error);
    }
}

export {createPost, getPostByPosterID, collectPosts, removePostByID, updatePost, getAllPosts}

