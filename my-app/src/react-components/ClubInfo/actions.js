import { updateUserRecord } from '../../actions/accountActions';
import { updateClub } from '../../actions/clubActions';

export const followClub = (context) => {
    context.state.userInfo.clubsFollowing.push(context.state.clubInfo._id)
    updateUserRecord(context.state.userInfo._id, 'clubsFollowing', context.state.userInfo.clubsFollowing).then((result) => {
        if (result === 200) {
            context.setState({
                userInfo: context.state.userInfo
            })
        } else {
            alert(`There was a problem updating the user. Status: ${result.status}`)
        }
    }).catch((error) => {
        console.log("Fatal Error")
        throw new Error(error)
    })
}

export const unfollowClub = (context) => {
    let clubID = context.state.clubInfo._id
    let target = -1
    let clubsFollowing = context.state.userInfo.clubsFollowing
    for (let i = 0; i < clubsFollowing.length; i++) {
        if (clubID === clubsFollowing[i]) {
            target = i
            break;
        }
    }

    if (target >= 0) {
        context.state.userInfo.clubsFollowing.splice(target, 1)
        updateUserRecord(context.state.userInfo._id, 'clubsFollowing', context.state.userInfo.clubsFollowing).then((result) => {
            if (result === 200) {
                context.setState({
                    userInfo: context.state.userInfo
                })
            } else {
                alert(`There was a problem updating the user. Status: ${result.status}`)
            }
        }).catch((error) => {
            console.log("Fatal Error")
            throw new Error(error)
        })
    } else {
        console.log("Couldnt unfollow club. Club not found.")
    }
}

export const joinClub = (context) => {
    let requested = context.state.clubInfo.requested
    if (requested.includes(context.state.userInfo._id)) {
        return;
    }

    context.state.clubInfo.requested.push(context.state.userInfo._id)
    updateClub(context.state.clubInfo._id, 'requested', context.state.clubInfo.requested).then((result) => {
        if (result === 200) {
            context.setState({
                clubInfo: context.state.clubInfo
            })
        } else {
            alert(`There was a problem updating the user. Status: ${result}`)
        }
    }).catch((error) => {
        console.log("Fatal error")
        throw new Error(error);
    })
}

export const cancelRequest = (context) => {
    let target = -1
    let requested = context.state.clubInfo.requested

    for (let i = 0; i < requested.length; i++) {
        if (requested[i] === context.state.userInfo._id) {
            target = i
            break;
        }
    }

    if (target >= 0) {
        context.state.clubInfo.requested.splice(target, 1)
        updateClub(context.state.clubInfo._id, 'requested', context.state.clubInfo.requested).then((result) => {
            if (result === 200) {
                context.setState({
                    clubInfo: context.state.clubInfo
                })
            } else {
                alert(`There was a problem updating the user. Status: ${result.status}`)
            }
        }).catch((error) => {
            console.log("Fatal error")
            throw new Error(error)
        })
    } else {
        console.log("Could find request to remove.");
    }
}

export const leaveClub = (context) => {
    let target = -1
    let members = context.state.clubInfo.members

    for (let i = 0; i < members.length; i++) {
        if (members[i] === context.state.userInfo._id) {
            target = i;
            break;
        }
    }

    if (target >= 0) {
        context.state.clubInfo.members.splice(target, 1)
        updateClub(context.state.clubInfo._id, 'members', context.state.clubInfo.members).then((result) => {
            if (result === 200) {
                context.setState({
                    clubInfo: context.state.clubInfo
                })
            } else {
                alert(`There was a problem updating the user. Status: ${result.status}`)
            }
        }).catch((error) => {
            console.log("Fatal error")
            throw new Error(error)
        })
    } else {
        console.log("Could not find club to leave.")
    }
}
