import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'
import { getAllPosts, removePostByID } from '../../../actions/postActions'

class PostList extends React.Component {
	constructor(props){ 
		super(props); 
		this.state = { 
			postIDs: props.posts,
			thisClubID: props.thisClubID, 
			posts: []
		}
	}

	componentDidMount(){ 
		getAllPosts().then(res => { 
			if(!res){ 
				alert(`Unable to retrieve posts`);
			} else { 
				this.setState({posts: res.filter(p => p.posterID === this.state.thisClubID)});
			}
		}, error => {
			alert(`${error}: Unable to retrieve posts`)
		});
	}

	delPost = async (postID) => {
		try {
			const status = await removePostByID(postID); 
			if (status === 200){
				let postsCopy = [...this.state.posts]; 
				this.setState({posts: postsCopy.filter(p => p._id !== postID)});
			} else { 
				alert(`Unable to delete post ${postID}`);
			}
		} catch (error) {
			alert(`${error}: Unable to delete post ${postID}`);
		}
	}

	render() {
		return (
			<div className="itemListContainer">
					<h2> Posts </h2>
					<Grid container spacing={2}>
									<Grid item xs={12} md={6}> 
										<List dense={true}> 
												{this.state.posts.map(post => 
													<Paper elevation={0} variant='outlined' key={post._id}>
														<ListItem> 
																<ListItemText
																	primary={post.content}
																	secondary={post.date}
																/>
																<ListItemSecondaryAction>
																	<Link 
																		to={`/club/${this.state.thisClubID}`}
																		style={{ textDecoration:'none',  margin:'10px' }}>
																			<Button 
																				size="small"
																				edge="end" 
																				aria-label="view" 
																				variant="outlined"
																				color="primary">
																				view
																			</Button> 
																	</Link>
																	<Button 
																		size="small"
																		edge="end" 
																		aria-label="delete" 
																		variant="outlined"
																		color="primary"
																		onClick={() => this.delPost(post._id)}>
																		Delete
																	</Button>
																</ListItemSecondaryAction>
														</ListItem> 
													</Paper>
													)}
										</List> 
									</Grid> 
					</Grid>
			</div> 
		)
	}
}

export default PostList;
