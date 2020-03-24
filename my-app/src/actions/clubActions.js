/*
 * This file contains actions relating to manipulating club data. For more extensive documentation, check the 
 * APIDocumentation.md file.
 */

 const fs = require('fs');

 /*
  * Wrapper for getting all clubs
  *
  */
async function getAllClubs() {
    const url = '/clubs/all'
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json text/plain, */*',
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
 * Wrapper for adding a new club
 *
 */
async function createClub(name, profilePicture=undefined, bannerImage=undefined) {
    // todo: change undefined to default images here?
    const url = '/clubs/create'
    const data = {
        name: name,
        execs: [],
        requested: [],
        members: []
    }

    if (profilePicture) {
        try {
            let profileData = await fs.readFile(profilePicture)
            let profileBase64 = profileData.toString('base64')
            let profilePic = new Buffer(profileBase64, 'base64')
            data.profilePicture = profilePic
        } catch (error) {
            console.log("Could not add image");
            console.log(error)
        }
    }

    if (bannerImage) {
        try {
            let bannerData = await fs.readFile(bannerImage)
            let bannerBase64 = bannerData.toString('base64')
            let bannerPic = new Buffer(bannerBase64, 'base64')
            data.bannerImage = bannerPic
        } catch (error) {
            console.log("Could not add image");
            console.log(error)
        }
    }

    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json text/plain, */*',
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

/*
 * Wrapper for getting a single club
 *
 */
async function getClub(id) {
    const url = `/clubs/get/${id}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        if (response.status === 200) {
            return await response.json()    
        } else {
            return {"status": response.status}
        }
    } catch (error) {
        throw new Error(error)
    }
}

/*
 * Wrapper for updating club info
 *
 */
async function updateClub(id, attr, new_val) {
    const url = `clubs/update/${id}`

    let val = new_val
    if (attr === "profilePicture" || attr === "bannerImage") {
        try {
            let data = await fs.readFile(new_val)
            let base64 = data.toString('base64')
            let img = new Buffer(base64, 'base64')
            val = img
        } catch (error) {
            console.log("Could not add image")
            console.log(error)
        }
    }

    const data = {
        attr: attr,
        nVal: val
    }

    const request = new Request(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })

    try {
        const response = await fetch(request)
        return response.status;
    } catch (error) {
        throw new Error(error)
    }
}

/*
 * Wrapper for updating club info
 *
 */
async function deleteClub(id) {
    const url = `clubs/remove/${id}`
    const request = new Request(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        return response.status
    } catch (error) {
        throw new Error(error)
    }
}

export {getAllClubs, createClub, getClub, updateClub, deleteClub}
