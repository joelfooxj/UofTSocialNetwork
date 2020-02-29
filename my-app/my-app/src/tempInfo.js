// this file is for storing hardcoded temp info for testing
// USERS
// CLUBS 
// POSTS

const Posts = [ 
  {postID: 1, title: "first!", content:"Lorem ipsum dolor sit amet", authorID:1, date:'20-02-2020'}, 
  {postID: 2, title: "second!", content:"it, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nes", authorID:2, date:'20-03-2020'},
  {postID: 3, title: "third!", content:"odi consequatur? Quis autem vel eu", authorID:1, date:'20-04-2020'}, 
  {postID: 4, title: "fourth!", content:"odi consequafasdfastfur? Qfaduis autem vel eu", authorID:3, date:'20-04-2020'}, 
  {postID: 5, title: "fifth!", content:"odi efa aeraberbaaconsequatur? Quis autem vel eu", authorID:4, date:'20-04-2020'}, 
  {postID: 6, title: "sixth!", content:"odi consequavaetrasur? Qsruis aaabrawrutem vel eu", authorID:4, date:'20-04-2020'}
]

const Users = [
  {userID: 1, name: 'joel', memberOf:['csc309', 'uoft', 'team11']},
  {userID: 2, name: 'victor', memberOf:['csc309', 'uoft']},
  {userID: 3, name: 'zhan', memberOf:['csc309','team11']},
  {userID: 4, name: 'nikita', memberOf:['csc309', 'team11']},
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {clubID: 1, name: 'csc309', execs:[1,4], posts:[1,2], requests:[2], members:[1,3]},
  {clubID: 2, name: 'uoft', execs:[3], posts:[3,4], requests:[2,4], members:[1,3]},
  {clubID: 3, name: 'team11', execs:[2,3], posts:[5,6], requests:[1], members:[2,3]}
]

export default {Users, Clubs, Posts}; 