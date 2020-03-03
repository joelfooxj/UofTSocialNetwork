// this file is for storing hardcoded temp info for testing
// USERS
// CLUBS 
// POSTS


class Account {
  constructor(username, permission, clubsExecOf, accID, password, firstName, lastName, email, clubsFollowing, clubsMemberOf, banned, profile, eventDecisions){
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
    this.profileImgFile = null
    this.profile = profile
    this.eventDecisions = eventDecisions
  }
}

const Accs = [
  new Account("user", 0, ["UofT PTSD Support Group"], 1, "user", "user", "user", "user@user.com", [], [], false),
  new Account("mike1995", 0, ["UofT Students Anonymous"], 2, "password", "mike", "johnson", "mike@gmail.com", [], [], true),
  new Account("admin", 1, [], 3, "admin", "admin", "admin", "admin@admin.com", [], [], false)
]


const Posts = [ 
  {postID: 1, clubID: 1, title: "first!", content:"Lorem ipsum dolor sit amet", authorID:1, date:'20-02-2020', place: 'Bahen Information Center', poster:'https://cdn4.vectorstock.com/i/1000x1000/13/63/abstract-poster-event-template-vector-26151363.jpg'}, 
  {postID: 2, clubID: 1, title: "second!", content:"it, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nes", authorID:2, date:'20-03-2020',place: 'Bahen Information Center', poster:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-polygon-dance-night-club-event-poster-template-7b992b14f8645fc966ef0288b6c30ed5_screen.jpg?ts=1561728036'},
  {postID: 3, clubID: 2, title: "third!", content:"odi consequatur? Quis autem vel eu", authorID:1, date:'20-04-2020',place: 'Bahen Information Center', poster:''}, 
  {postID: 4, clubID: 2, title: "fourth!", content:"odi consequafasdfastfur? Qfaduis autem vel eu", authorID:3, date:'20-04-2020', place: 'Bahen Information Center',poster:''}, 
  {postID: 5, clubID: 3, title: "fifth!", content:"odi efa aeraberbaaconsequatur? Quis autem vel eu", authorID:2, date:'20-04-2020',place: 'Bahen Information Center',poster:''}, 
  {postID: 6, clubID: 3, title: "sixth!", content:"odi consequavaetrasur? Qsruis aaabrawrutem vel eu", authorID:2, date:'20-04-2020',place: 'Bahen Information Center',poster:''}
]


// See that clubs hold a list of users who have exec permissions
const Clubs = [
  {
    clubID: 1, name: 'CSC309', execs:[1],
    posts:[1,2], requests:[3], members:[1], 
    link: '/csc309', profilePic: require('./images/csc309pp.png'),
    bannerImage: require('./images/csc309bi.jpg'), 
    bioText: `This course provides an introduction to the technologies 
    used for developing Web applications. We discuss technologies for 
    static and dynamic content generation, including N-tier, MVC architectures, 
    and mobile supported web development. We also cover general web design 
    principles, security, and web performance.`
  },

  {
    clubID: 2, name: 'U of T', execs:[1,3], 
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

export default {Accs, Clubs, Posts, Account}; 
