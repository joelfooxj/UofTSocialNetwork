// this file is for storing hardcoded temp info for testing
// USERS
// CLUBS 
// POSTS


class Account {
  constructor(username, permission, clubsExecOf, accID, password, firstName, lastName, email, clubsFollowing, clubsMemberOf, banned){
    this.username = username
    this.permission = permission
    this.clubsExecOf = clubsExecOf
    this.id = accID
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.timelineOpts = [false, false, false] /*0 - timeline updates for clubs this user is a part of
                                                1 - timeline updates for clubs this user follows
                                                2 - timeline updates for clubs this user is an executive of
                                              */
    this.clubsMemberOf = clubsMemberOf
    this.clubsFollowing = clubsFollowing
    this.banned = banned
  }
}

const Accs = [
  new Account("user", 0, ["UofT PTSD Support Group"], 1, "user", "user", "user", "user@user.com", [], [], false),
  new Account("mike1995", 0, ["UofT Students Anonymous"], 2, "password", "mike", "johnson", "mike@gmail.com", [], [], false),
  new Account("admin", 1, [], 3, "admin", "admin", "admin", "admin@admin.com", [], [], false)

]


const Posts = [ 
  {postID: 1, title: "first!", content:"Lorem ipsum dolor sit amet", authorID:1, date:'20-02-2020'}, 
  {postID: 2, title: "second!", content:"it, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nes", authorID:2, date:'20-03-2020'},
  {postID: 3, title: "third!", content:"odi consequatur? Quis autem vel eu", authorID:1, date:'20-04-2020'}, 
  {postID: 4, title: "fourth!", content:"odi consequafasdfastfur? Qfaduis autem vel eu", authorID:3, date:'20-04-2020'}, 
  {postID: 5, title: "fifth!", content:"odi efa aeraberbaaconsequatur? Quis autem vel eu", authorID:4, date:'20-04-2020'}, 
  {postID: 6, title: "sixth!", content:"odi consequavaetrasur? Qsruis aaabrawrutem vel eu", authorID:4, date:'20-04-2020'}
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {clubID: 1, name: 'csc309', execs:[1,4], posts:[1,2], requests:[2], members:[1,3]},
  {clubID: 2, name: 'uoft', execs:[3], posts:[3,4], requests:[2,4], members:[1,3]},
  {clubID: 3, name: 'team11', execs:[2,3], posts:[5,6], requests:[1], members:[2,3]}
]

export default {Accs, Clubs, Posts}; 