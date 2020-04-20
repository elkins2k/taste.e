import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Login'
import User from './components/User'
import Contents from './components/Contents'
import ContentDetails from './components/ContentDetails'
import RecipeDetails from './components/RecipeDetails'
import NewRecipe from './components/NewRecipe'
import Logout from './components/Logout'

// const corsProxy = 'https://cors-anywhere.herokuapp.com/'
// const apiURL = process.env.REACT_APP_BACKEND_APP_URL || corsProxy+'https://taste-e-recipe-api.herokuapp.com/api' 
const apiURL = 'http://localhost:8080/api' 

export default withRouter(class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      contents: [],
      currentHeading:'',
      users: [],
      user_id: ''
    }
  }

  // getUsers = () => {
  //   axios
  //     .get(`${apiURL}/users`)
  //     .then(res => {
  //       this.setState(
  //         {
  //           currentUser: res.data
  //         }
  //       )
  //     })
  // }

  // getUser = (e) => {
  //   e.preventDefault()
  //   axios
  //     .get(`${apiURL}/users/${e.target.id}`)
  //     .then(res => {
  //       this.props.history.push('/')
  //       this.setState(
  //         {
  //           currentUser: res.data
  //         }
  //       )
  //     })
  //     .catch(error => console.log('error', error))
  // }

  responseGoogle = (response) => {  //working
    axios.post (`${apiURL}/users`,{
      email: response.profileObj.email
    }).then ( res => {
      this.setState ({
        users: res.data,
        user_id: res.data[0]._id,
        currentUser: res.data[0].email
      })
      this.props.history.push(`/user/${this.state.user_id}`)
    })
  }
   
  postUser = (e) => {  //working
    e.preventDefault ()
    axios.post (`${apiURL}/users`, {
      email: this.state.currentUser
    }).then ( res => {
      this.setState ({
        users: res.data,
        user_id: res.data[res.data.findIndex(user => {
          return user.email === this.state.currentUser
        })]._id
      })
      this.props.history.push(`/user/${this.state.user_id}`)
    })
  }

  putUser = (e) => {  //working
    e.preventDefault ()
    let putUserData = {}
    if (this.state.newFirstName) {
      putUserData = {
        ...putUserData,
        firstName: this.state.newFirstName
      }
    } if (this.state.newLastName) {
      putUserData = {
        ...putUserData,
        lastName: this.state.newLastName
      }
    } if (this.state.newCarbs) {
      putUserData = {
        ...putUserData,
        avoidCarbs: this.state.newCarbs
      }
    } if (this.state.newDairy) {
      putUserData = {
        ...putUserData,
        avoidDairy: this.state.newDairy
      }
    } if (this.state.newEggs) {
      putUserData = {
        ...putUserData,
        avoidEggs: this.state.newEggs
      }
    } if (this.state.newGluten) {
      putUserData = {
        ...putUserData,
        avoidGluten: this.state.newGluten
      }
    } if (this.state.newMeat) {
      putUserData = {
        ...putUserData,
        avoidMeat: this.state.newMeat
      }
    } if (this.state.newNuts) {
      putUserData = {
        ...putUserData,
        avoidNuts: this.state.newNuts
      }
    } if (this.state.newQuinoa) {
      putUserData = {
        ...putUserData,
        avoidQuinoa: this.state.newQuinoa
      }
    } if (this.state.newShellfish) {
      putUserData = {
        ...putUserData,
        avoidShellfish: this.state.newShellfish
      }
    } if (this.state.newSpicy) {
      putUserData = {
        ...putUserData,
        avoidSpicy: this.state.newSpicy
      }
    }
    axios.put (`${apiURL}/users/${e.target.id}`, 
      putUserData
    ).then ( res => {
      this.setState ({
        users: res.data,
        newFirstName:'',
        newLastName:'',
        newCarbs:'',
        newDairy:'',
        newEggs:'',
        newGluten:'',
        newMeat:'',
        newNuts:'',
        newQuinoa:'',
        newShellfish:'',
        newSpicy: ''
      })
    })
  }

  deleteUser = (e) => {  //working
    e.preventDefault ()
    axios.delete (`${apiURL}/users/${e.target.id}`)
      .then ( res => {
        this.props.history.push ('/')
        this.setState ({
          users: res.data,
          currentUser: ''
        })
      })
  }

  getContents = () => {  //working
    axios.get (`${apiURL}/contents`)
      .then ( res => {
        this.setState({
          contents: res.data
        })
      })
  }

  getContent = () => {  //working
    axios.get(`${apiURL}/contents/:id`)
      .then ( res => {
        this.setState({
          contents: res.data
        })
      })
  }

  putContent = (e) => {  //working
    e.preventDefault ()
    axios.put (`${apiURL}/contents/${e.target.id}`, {
      heading:this.state.newHeading
    })
    .then ( res => {
      this.setState ({
        contents: res.data
      })
      this.props.history.push ('/contents')
    })
  }

  getRecipes = () => { //working
    axios.get (`${apiURL}/recipes`)
      .then(res => {
        this.setState({
          recipes: res.data
        })
      })
  }

  postRecipe = (e) => {  //working
    e.preventDefault ()
    axios.post (`${apiURL}/recipes`,{
        name: this.state.newRecipeName,
        heading: this.state.newHeading,
        submittedBy: this.state.currentUser
    }).then ( res => {
      this.setState ( prevState => ({
        recipes: [...prevState.recipes, res.data],
      }))
      this.getContents()
      this.getRecipes()
      this.props.history.push (`/contents/${res.data.heading._id}/${res.data._id}`)
    })
  }

  putRecipe = (e) => {  //working
    e.preventDefault()
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.id
    let putRecipeData = {}
    if (this.state.newRecipeName !== '') {
      putRecipeData = {
        ...putRecipeData,
        name: this.state.newRecipeName
      }
    } if (this.state.newDirections !== '') {
      putRecipeData = {
        ...putRecipeData,
        directions: this.state.newDirections
      }
    }
    axios.put (`${apiURL}/recipes/${e.target.id}`,
      putRecipeData  
  ).then ( res => {
      this.setState({
        recipes: res.data,
        newRecipeName:'',
        newDirections:'',
      })
      this.props.history.push(`/contents/${headingId}/${recipeId}`)
    })
  }

  deleteRecipe = (e) => {  //working
    e.preventDefault ()
    axios.delete (`${apiURL}/recipes/${e.target.id}`)
      .then ( res => {
        this.props.history.push(`/contents`)
        this.setState ({
          recipes: res.data
        })
        
      })
  }

  postIngredient = (e) => {  //working
    e.preventDefault ()
    e.persist()
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.id
    axios.post (`${apiURL}/recipes/${e.target.id}/new-ingredient`, {
        ingredient: this.state.newIngredient
    }).then ( res => {
      e.target.reset()
      this.setState ({
        newIngredient: ''
      })
      this.getRecipes()
      this.props.history.push(`/contents/${headingId}/${recipeId}`);
    })
  }

  deleteIngredient = (e) => {  //working
    e.preventDefault();
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.getAttribute('recipe-id')
    let ingredientId = e.target.getAttribute('data-ingredient-id')
    axios.delete(`${apiURL}/recipes/${recipeId}/delete-ingredient/${ingredientId}`)
      .then ( res => {
        this.setState({
          recipes: res.data
        })
        this.getRecipes()
        this.props.history.push(`/contents/${headingId}/${recipeId}`);
      })
  }

  handleFormChange = (e) => {  //working
    this.setState ({
      [e.target.name]: e.target.value
    })
  }

  handleLogout = () => { //working
    if (this.state.currentUser !== '') {
      this.setState({
        currentUser:''
      })
    }
    this.props.history.push('/')
  }

  componentDidMount () {
    this.getContents ()
    this.getRecipes ()
  }
  
  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to="/contents">
              Table of Contents {this.state.currentHeading}
            </Link>
          </div>
          <div>
            <Link to={`/user/${this.state.user_id}`}>
              Welcome {this.state.currentUser}
            </Link>
          </div>
          <div>
            <Link to='/logout'>
              LogOut
            </Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path='/logout'
              render={
                () => <Logout
                  handleLogout={this.handleLogout}
                />
              }
            />
            <Route exact path='/' //working
              render={
                () => <Login
                  users={this.state.users}
                  handleSubmit={this.postUser}
                  handleFormChange={this.handleFormChange}
                  responseGoogle={this.responseGoogle}
                />
              }
            />
            <Route path='/user/:id' //working
              render={
                routerProps => <User
                  {...routerProps}
                  users={this.state.users}
                  handlePutUser={this.putUser}
                  handleFormChange={this.handleFormChange}
                  handleDelete={this.deleteUser}
                />
              }
            /><Route exact path='/contents' //working
              render={
                () => <Contents
                  contents={this.state.contents}
                />
              }
            />
            <Route exact path='/contents/:id'
              render={
                routerProps => <ContentDetails
                  {...routerProps}
                  contents={this.state.contents}
                  recipes={this.state.recipes}
                  handleFormChange={this.handleFormChange}
                  handlePutContent={this.putContent}
                />
              }
            />
            <Route exact path='/contents/:id/:recipeId'
              render={
                routerProps => <RecipeDetails
                  {...routerProps}
                  currentUser={this.state.currentUser}
                  recipes={this.state.recipes}
                  contents={this.state.contents}
                  handleFormChange={this.handleFormChange}
                  handlePutRecipe={this.putRecipe}
                  handleDeleteRecipe={this.deleteRecipe}
                  handlePostIngredient={this.postIngredient}
                  handleNewIngredient={this.state.newIngredient}
                  handleDeleteIngredient={this.deleteIngredient}
                />
              }
            />
            <Route exact path='/recipe/new'
              render={
                () => <NewRecipe
                  handleFormChange={this.handleFormChange}
                  handlePostRecipe={this.postRecipe}
                />
              }
            />
            <Route path='*'
              render={
                () => <Redirect to='/' />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
})