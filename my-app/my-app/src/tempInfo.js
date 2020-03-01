// this file is for storing hardcoded temp info for testing
// USERS
// CLUBS 
// POSTS


class Account {
  constructor(username, permission, clubsExecOf, accID, password, firstName, lastName, email, clubsFollowing, clubsMemberOf){
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
  }
}

const Accs = [
  new Account("user", 0, [1], 1, "user", "user", "user", "user@user.com", [2, 3], []),
  new Account("mike1995", 0, [2], 2, "password", "mike", "johnson", "mike@gmail.com", [3], [2]),
  new Account("admin", 1, [1, 2, 3], 3, "admin", "admin", "admin", "admin@admin.com", [], [])
]


const Posts = [ 
  {postID: 1, title: "first!", content:"Lorem ipsum dolor sit amet", authorID:1, date:'20-02-2020'}, 
  {postID: 2, title: "second!", content:"it, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nes", authorID:2, date:'20-03-2020'},
  {postID: 3, title: "third!", content:"odi consequatur? Quis autem vel eu", authorID:1, date:'20-04-2020'}, 
  {postID: 4, title: "fourth!", content:"odi consequafasdfastfur? Qfaduis autem vel eu", authorID:3, date:'20-04-2020'}, 
  {postID: 5, title: "fifth!", content:"odi efa aeraberbaaconsequatur? Quis autem vel eu", authorID:2, date:'20-04-2020'}, 
  {postID: 6, title: "sixth!", content:"odi consequavaetrasur? Qsruis aaabrawrutem vel eu", authorID:2, date:'20-04-2020'}
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {
    clubID: 1, name: 'CSC309', execs:[1],
    posts:[1,2], requests:[3], members:[2], 
    link: '/csc309', profilePic: require('./images/csc309pp.png'),
    bannerImage: require('./images/csc309bi.jpg'), 
    bioText: `This course provides an introduction to the technologies 
    used for developing Web applications. We discuss technologies for 
    static and dynamic content generation, including N-tier, MVC architectures, 
    and mobile supported web development. We also cover general web design 
    principles, security, and web performance.`
  },

  {
    clubID: 2, name: 'U of T', execs:[3], 
    posts:[3,4], requests:[2,4], members:[1,3], 
    link: '/uoft', profilePic: require('./images/uoftpp.png'),
    bannerImage: require('./images/uoftbi.png'),
    bioText: `Connect with UofT, Canada's top university and one of the world’s strongest academic & research powerhouses.`
  },

  {
    clubID: 3, name: 'Team 11', execs:[2,3], 
    posts:[5,6], requests:[1], members:[2,3], 
    link: '/team11', profilePic: require('./images/team11pp.png'), 
    bannerImage: require('./images/team11bi.jpg'),
    bioText: `We may quite possible be the best team to ever exist in the history of the universe. There is simply no competition.`
  }
]

export default {Accs, Clubs, Posts};