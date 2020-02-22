// this file is for storing hardcoded temp info for testing
// USERS
// CLUBS 
// POSTS

const Posts = [ 
  {title: "first!", content:"Lorem ipsum dolor sit amet", author:'joel', date:'20-02-2020'}, 
  {title: "second!", content:"it, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nes", author:'victor', date:'20-03-2020'},
  {title: "first!", content:"odi consequatur? Quis autem vel eu", author:'nikita', date:'20-04-2020'}
]

const Users = [
  {userID: 1, name: 'joel', memberOf:['csc309', 'uoft', 'team11']},
  {userID: 2, name: 'victor', memberOf:['csc309', 'uoft']},
  {userID: 3, name: 'zhan', memberOf:['csc309','team11']},
  {userID: 4, name: 'nikita', memberOf:['csc309', 'team11']},
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {clubID: 1, name: 'csc309', execs:['joel', 'nikita'], posts:[Posts[0]]},
  {clubID: 2, name: 'uoft', execs:['zhan'], posts:[Posts[1]]},
  {clubID: 3, name: 'team11', execs:['joel', 'victor'], posts:[Posts[2]]}
]

export default [Users, Clubs]; 