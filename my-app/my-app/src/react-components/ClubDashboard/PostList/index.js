import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'

const PostList = props => {
	const posts = props.posts;
	console.log(posts)
	return (
			<div className="itemListContainer">
					<h2> Posts </h2>
					<Grid container spacing={2}>
									<Grid item xs={12} md={6}> 
										<List dense={true}> 
												{posts.map(post => 
													<Paper elevation={0} variant='outlined' key={post.postID}>
														<ListItem> 
																<ListItemText
																	primary={post.title}
																	secondary={post.date}
																/>
																<ListItemSecondaryAction>
																	<Link to={{
																			pathname: props.thisClubLink
																		}}
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
																		onClick={() => props.onDelete('post', post.postID)}>
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

export default PostList;
