//Functions in this file are used for manipulating account data
//they will both, manipulate our internal states and make 
//database queries as necessary


/**
 * NOTE: This function will also interact with our database to 
 * update the account information there.
 * 
 * Change attributes of account with id accId.
 * 
 * Set attribute with name attrName to have value attrVal and
 * update the state of the internal component storing this 
 * information given as main.
 * 
 * 
 * @param {React.Component} context component storing internal account data
 * @param {Array} accs              array of all user accounts.
 * @param {int} accId               id of account to be changed.
 * @param {String} attrName         name of account attribute to be changed.
 * @param {String} attrVal          new value of attribute being changed.
 */
export const changeAccInfo = (context, accs, accId, attrName, attrVal) => {
    for(let i = 0; i < accs.length; i++){
        if(accs[i].id === accId){
          accs[i][attrName] = attrVal
        }
      }
  
      context.setState({
        accounts: accs
      })
}


/**
 * NOTE: This function will query our database and update the information there
 * as well.
 * 
 * Toggle timeline option at index optionIndex of the option array of account
 * with id accId.
 * 
 * @param {React.Component} context component storing internal information to 
 *                                  be updated.
 * @param {Array} accs              array of all user accounts.
 * @param {int} optionIndex         index of option to toggle.
 * @param {int} accId               id of account the options of which are 
 *                                  being changed.
 */
export const changeAccTimelineOpts = (context, accs, optionIndex, accId) => {
  for(let i = 0; i < accs.length; i++){
    if(accs[i].id === accId){
      accs[i].timelineOpts[optionIndex] = !accs[i].timelineOpts[optionIndex]
    }
  }

  context.setState({
    accounts: accs
  })
}

/**
 * NOTE: This function will query our database and remove the account
 * from there too.
 * 
 * Delete the account with accId.
 * 
 * 
 * @param {React.Component} context component storing internal information to 
 *                                  be updated.
 * @param {int}  accId              id of account to be removed.
 * @param {Array} accs              array of all user accounts
 */
export const deleteAccount = (context, accId, accs) => {
  let newAccounts = []
  for(let i = 0; i < accs.length; i++){
    if(!(accs[i].id === accId)){
      newAccounts.push(accs[i])
    }
  }
  context.setState({
    accounts: newAccounts
  })
}
