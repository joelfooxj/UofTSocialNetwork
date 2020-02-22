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
  {name: 'joel', memberOf:['csc309', 'uoft', 'team11']},
  {name: 'victor', memberOf:['csc309', 'uoft']},
  {name: 'zhan', memberOf:['csc309','team11']},
  {name: 'nikita', memberOf:['csc309', 'team11']},
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {name: 'csc309', execs:['joel', 'nikita'], posts:[Posts[0]]},
  {name: 'uoft', execs:['zhan'], posts:[Posts[1]]},
  {name: 'team11', execs:['joel', 'victor'], posts:[Posts[2]]}
]
// const tempData = [Users, Clubs]; 
// export default tempData;

export default [Users, Clubs]; 