import { rule } from '../../server/controllers';
import './App.css';

const handleError = (message) => {
  $("#errorMessage").text(message);
}

const redirect = (response) => {
  window.location = response.redirect;
}

const sendAjax = (type,action,data,sucess) => {
  $.ajax({
    cache:false,
    type:type,
    url:action,
    data:data,
    dataType: "json",
    success: success,
    error: function(xhs,status,error){
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  })
}

const makerPage = () => {
  return(
    <div id="maker">
      <div id="makerControls"></div>
      <div id="makerCreations"></div>
    </div>
  );
}

const handleItem = (e) => {
  e.preventDefault();

  if($("#itemName").val() == '' || $("#itemPrice").val() == '' || $("#itemType").val() == '' || $("#itemDescription").val() == '' || $("#itemLocation").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#itemForm").attr("action"), $("#itemForm").serialize(), function(){
    loadItemsFromServer();
  });

  return false;
};

const itemForm = () => {
  return(
    <form id="itemForm"
     onSubmit={handleItem}
     name="itemForm"
     action="/item"
     method="POST"
     className="itemForm"
    >
      <label htmlFor="itemName"> Name: </label>
      <input id="itemName" type="text" name="itemName" placeholder="Name"/>
      <label htmlFor="itemPrice"> Price: </label>
      <input id="itemPrice" type="text" name="itemPrice" placeholder="Item Price"/>
      <label htmlFor="itemType"> Type: </label>
      <input id="itemType" type="text" name="itemType" placeholder="Type"/>
      <label htmlFor="itemDescription"> Description: </label>
      <input id="itemDescription" type="text" name="itemDescription" placeholder="Item Description"/>
      <label htmlFor="itemLocation"> Location: </label>
      <input id="itemLocation" type="text" name="itemLocation" placeholder="Location"/>
      <input id="itemSubmit" type="submit" value="Submit Item"/>
    </form>
  );
};

const itemList = function(props){
  if(props.items.length === 0){
    return(
      <div className="itemList">
        <h3 className="emptyItem">No items have been created yet</h3>
      </div>
    );
  }

  const itemNodes = props.items.map(function(item){
    return(
      <div key={item._id} className = "item">
          <h3 className="itemName"> Name: {item.name} </h3>
          <h3 className="itemPrice"> Price: {item.price} </h3>
          <h3 className="itemType"> Type: {item.itemType} </h3>
          <h3 className="itemDescription"> Description: {item.description} </h3>
          <h3 className="itemLocation"> Location: {item.location} </h3>
      </div>
    );
  });

  return(
    <div className="itemList">
        {itemNodes}
    </div>
  );
};

const loadItemsFromServer = () => {
  sendAjax('GET', '/getItems', null, (data) => {
    ReactDOM.render(
      <itemList items={data.items} />, document.querySelector('#items')
    );
  });
};

const createItemPage = () => {
  ReactDOM.render(makerPage(), "#content");

  ReactDOM.render(
    <itemForm/>, document.querySelector("#makerControls")
  );

  ReactDOM.render(
    <itemList items={[]}/>,document.querySelector("#makerCreations")
  );

  loadItemsFromServer();
};

const handleNpc = (e) => {
  e.preventDefault();

  if($("#npcName").val() == '' || $("#npcAge").val() == '' || $("#npcAlignment").val() == '' || $("#npcAppearance").val() == '' || $("#npcPersonality").val() == '' || $("#npcBackstory").val() == '' || $("#npcLocation").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#npcForm").attr("action"), $("#npcForm").serialize(), function(){
    loadNpcsFromServer();
  });

  return false;
};

const npcList = function(props){
  if(props.npcs.length === 0){
    return(
      <div className="npcList">
        <h3 className="emptyNpc">No NPCs have been created yet</h3>
      </div>
    );
  }

  const npcNodes = props.npcs.map(function(npc){
    return(
      <div key={npc._id} className = "npc">
          <h3 className="npcName"> Name: {npc.name} </h3>
          <h3 className="npcAge"> Age: {npc.age} </h3>
          <h3 className="npcAlignment"> Alignment: {npc.alignment} </h3>
          <h3 className="npcAppearance"> Appearance: {npc.appearance} </h3>
          <h3 className="npcPersonality"> Personality: {npc.personality} </h3>
          <h3 className="npcBackstory"> Backstory: {npc.backstory} </h3>
          <h3 className="npcLocation"> Location: {npc.location} </h3>
      </div>
    );
  });

  return(
    <div className="npcList">
        {npcNodes}
    </div>
  );
};

const loadNpcsFromServer = () => {
  sendAjax('GET', '/getNpcs', null, (data) => {
    ReactDOM.render(
      <npcList npcs={data.npcs} />, document.querySelector('#npcs')
    );
  });
};

const npcForm = () => {
  return(
    <form id="npcForm"
     onSubmit={handleNpc}
     name="npcForm"
     action="/npc"
     method="POST"
     className="npcForm"
    >
      <label htmlFor="npcName"> Name: </label>
      <input id="npcName" type="text" name="npcName" placeholder="Name"/>
      <label htmlFor="npcAge"> Age: </label>
      <input id="npcAge" type="text" name="npcAge" placeholder="Age"/>
      <label htmlFor="npcAlignment"> Alignment: </label>
      <input id="npcAlignment" type="text" name="npcAlignment" placeholder="Alignment"/>
      <label htmlFor="npcAppearance"> Appearance: </label>
      <input id="npcAppearance" type="text" name="npcAppearance" placeholder="Appearance"/>
      <label htmlFor="npcPersonality"> Personality: </label>
      <input id="npcPersonality" type="text" name="npcPersonality" placeholder="Personality"/>
      <label htmlFor="npcBackstory"> Backstory: </label>
      <input id="npcBackstory" type="text" name="npcBackstory" placeholder="Backstory"/>
      <label htmlFor="npcLocation"> Location: </label>
      <input id="npcLocation" type="text" name="npcLocation" placeholder="Location"/>
      <input id="npcSubmit" type="submit" value="Submit NPC"/>
    </form>
  );
};

const createNpcPage = () => {
  ReactDOM.render(makerPage(), "#content");

  ReactDOM.render(
    <npcForm/>, document.querySelector("#makerControls")
  );

  ReactDOM.render(
    <npcList npcs={[]}/>,document.querySelector("#makerCreations")
  );

  loadNpcsFromServer();
};

const handlePlace = (e) => {
  e.preventDefault();

  if($("#placeName").val() == '' || $("#placePopulation").val() == '' || $("#placeType").val() == '' || $("#placeClimate").val() == '' || $("#placeDescription").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#placeForm").attr("action"), $("#placeForm").serialize(), function(){
    loadPlacesFromServer();
  });

  return false;
};

const placeList = function(props){
  if(props.places.length === 0){
    return(
      <div className="placeList">
        <h3 className="emptyPlace">No NPCs have been created yet</h3>
      </div>
    );
  }

  const placeNodes = props.places.map(function(place){
    return(
      <div key={place._id} className = "place">
          <h3 className="placeName"> Name: {place.name} </h3>
          <h3 className="placePopulation"> Population: {place.population} </h3>
          <h3 className="placeType"> Type: {place.placeType} </h3>
          <h3 className="placeClimate"> Climate: {place.climate} </h3>
          <h3 className="placeDescription"> Description: {place.description} </h3>
      </div>
    );
  });

  return(
    <div className="placeList">
        {placeNodes}
    </div>
  );
};

const loadPlacesFromServer = () => {
  sendAjax('GET', '/getPlaces', null, (data) => {
    ReactDOM.render(
      <placeList places={data.places} />, document.querySelector('#places')
    );
  });
};

const placeForm = () => {
  return(
    <form id="placeForm"
     onSubmit={handlePlace}
     name="placeForm"
     action="/place"
     method="POST"
     className="placeForm"
    >
      <label htmlFor="placeName"> Name: </label>
      <input id="placeName" type="text" name="placeName" placeholder="Name"/>
      <label htmlFor="placePopulation"> Population: </label>
      <input id="placePopulation" type="text" name="placePopulation" placeholder="Population"/>
      <label htmlFor="placeType"> Type: </label>
      <input id="placeType" type="text" name="placeType" placeholder="Type"/>
      <label htmlFor="placeClimate"> Climate: </label>
      <input id="placeClimate" type="text" name="placeClimate" placeholder="Climate"/>
      <label htmlFor="placeDescription"> Description: </label>
      <input id="placeDescription" type="text" name="placeDescription" placeholder="Description"/>
      <input id="placeSubmit" type="submit" value="Submit Place"/>
    </form>
  );
};

const createPlacePage = () => {
  ReactDOM.render(makerPage(), "#content");

  ReactDOM.render(
    <placeForm/>, document.querySelector("#makerControls")
  );

  ReactDOM.render(
    <placeList places={[]}/>,document.querySelector("#makerCreations")
  );

  loadPlacesFromServer();
};

const handleQuest = (e) => {
  e.preventDefault();

  if($("#questName").val() == '' ||  $("#questType").val() == '' || $("#questGiver").val() == '' || $("#questReward").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function(){
    loadQuestsFromServer();
  });

  return false;
};

const questList = function(props){
  if(props.quests.length === 0){
    return(
      <div className="questList">
        <h3 className="emptyQuest">No NPCs have been created yet</h3>
      </div>
    );
  }

  const questNodes = props.quests.map(function(quest){
    return(
      <div key={quest._id} className = "quest">
          <h3 className="questName"> Name: {quest.name} </h3>
          <h3 className="questType"> Type: {quest.questType} </h3>
          <h3 className="questGiver"> Quest Giver: {quest.questGiver} </h3>
          <h3 className="questReward"> Reward: {quest.reward} </h3>
      </div>
    );
  });

  return(
    <div className="questList">
        {questNodes}
    </div>
  );
};

const loadQuestsFromServer = () => {
  sendAjax('GET', '/getQuests', null, (data) => {
    ReactDOM.render(
      <questList quests={data.quests} />, document.querySelector('#quests')
    );
  });
};

const questForm = () => {
  return(
    <form id="questForm"
     onSubmit={handleQuest}
     name="questForm"
     action="/quest"
     method="POST"
     className="questForm"
    >
      <label htmlFor="questName"> Name: </label>
      <input id="questName" type="text" name="questName" placeholder="Name"/>
      <label htmlFor="questGiver"> Quest Giver: </label>
      <input id="questGiver" type="text" name="questGiver" placeholder="Quest Giver"/>
      <label htmlFor="questObjective"> Objective: </label>
      <input id="questObjective" type="text" name="questObjective" placeholder="Objective"/>
      <label htmlFor="questReward"> Reward: </label>
      <input id="questReward" type="text" name="questReward" placeholder="Reward"/>
      <input id="questSubmit" type="submit" value="Submit Quest"/>
    </form>
  );
};

const createQuestPage = () => {
  ReactDOM.render(makerPage(), "#content");

  ReactDOM.render(
    <questForm/>, document.querySelector("#makerControls")
  );

  ReactDOM.render(
    <questList quests={[]}/>,document.querySelector("#makerCreations")
  );

  loadQuestsFromServer();
};

const handleRule = (e) => {
  e.preventDefault();

  if($("#ruleName").val() == '' ||  $("#ruleOldText").val() == '' || $("#ruleNewText").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#ruleForm").attr("action"), $("#ruleForm").serialize(), function(){
    loadRulesFromServer();
  });

  return false;
};

const ruleList = function(props){
  if(props.rules.length === 0){
    return(
      <div className="ruleList">
        <h3 className="emptyRule">No NPCs have been created yet</h3>
      </div>
    );
  }

  const ruleNodes = props.rules.map(function(rule){
    return(
      <div key={rule._id} className = "rule">
          <h3 className="ruleName"> Name: {rule.name} </h3>
          <h3 className="ruleOldText"> Old Text: {rule.ruleOldText} </h3>
          <h3 className="ruleNewText"> New Text: {rule.ruleNewText} </h3>
      </div>
    );
  });

  return(
    <div className="ruleList">
        {ruleNodes}
    </div>
  );
};

const loadRulesFromServer = () => {
  sendAjax('GET', '/getRules', null, (data) => {
    ReactDOM.render(
      <ruleList rules={data.rules} />, document.querySelector('#rules')
    );
  });
};

const ruleForm = () => {
  return(
    <form id="ruleForm"
     onSubmit={handleRule}
     name="ruleForm"
     action="/rule"
     method="POST"
     className="ruleForm"
    >
      <label htmlFor="ruleName"> Name: </label>
      <input id="ruleName" type="text" name="ruleName" placeholder="Name"/>
      <label htmlFor="ruleOldText"> Old Text: </label>
      <input id="ruleOldText" type="text" name="ruleOldText" placeholder="Old Text"/>
      <label htmlFor="ruleNewText"> New Text: </label>
      <input id="ruleNewText" type="text" name="ruleNewText" placeholder="New Text"/>
      <input id="ruleSubmit" type="submit" value="Submit Rule"/>
    </form>
  );
};

const createRulePage = () => {
  ReactDOM.render(makerPage(), "#content");

  ReactDOM.render(
    <ruleForm/>, document.querySelector("#makerControls")
  );

  ReactDOM.render(
    <ruleList rules={[]}/>,document.querySelector("#makerCreations")
  );

  loadRulesFromServer();
};

const handleLogin = (e) => {
  e.preventDefault();

  if($("#user").val() == '' || $("#pass").val() == ''){
    handleError("Username and/or password is missing");
    return false;
  }

  sendAjax('POST',$("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}

const LoginWindow = () => {
  return(
    <form id="loginForm"
    name="loginForm"
    onSubmit={handleLogin}
    action="/login"
    method="POST"
    className="mainForm">
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <input className="formSubmit" type="submit" value="Sign in"/>
    </form>
  )
}

const createLoginWindow = () => {
  ReactDOM.render(
    <LoginWindow/>,
    document.querySelector("#content")
  );
};


const handleSignup = (e) => {
  e.preventDefault();

  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST',$("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}

const SignupWindow = () => {
  return(
    <form id="signupForm"
    name="signupForm"
    onSubmit={handleSignup}
    action="/login"
    method="POST"
    className="mainForm">
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <label htmlFor="pass2">Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
      <input className="formSubmit" type="submit" value="Sign up"/>
    </form>
  )
}

const createSignupWindow = () => {
  ReactDOM.render(
    <SignupWindow/>,
    document.querySelector("#content")
  );
};

const setup = () => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  const logoutButton = document.querySelector("#logoutButton");
  const itemButton = document.querySelector("#itemButton");
  const npcButton = document.querySelector("#npcButton");
  const placeButton = document.querySelector("#npcButton");
  const questButton = document.querySelector("#questButton");
  const ruleButton = document.querySelector("#ruleButton");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow();
    return false;
  });

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow();
    return false;
  });

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendAjax('GET', '/logout', null, redirect);
    return false;
  });

  itemButton.addEventListener("click", (e) => {
    e.preventDefault();
    createItemPage();
    return false;
  });

  npcButton.addEventListener("click", (e) => {
    e.preventDefault();
    createNpcPage();
    return false;
  });

  placeButton.addEventListener("click", (e) => {
    e.preventDefault();
    createPlacePage();
    return false;
  });

  questButton.addEventListener("click", (e) => {
    e.preventDefault();
    createQuestPage();
    return false;
  });

  ruleButton.addEventListener("click", (e) => {
    e.preventDefault();
    createRulePage();
    return false;
  });

  createLoginWindow();

}

$(document).ready(function(){
  setup();
})

function App() {
  return (
    <div className="App">
      <h1>Tabletop RPG Organizer</h1>
      <div id="nav">
        <button id="loginButton">Login</button>
        <button id="signupButton">Sign Up</button>
        <button id="logout">Log Out</button>
        <button id="itemButton">Item</button>
        <button id="npcButton">NPC</button>
        <button id="placeButton">Place</button>
        <button id="questButton">Quest</button>
        <button id="ruleButton">Rule</button>
      </div>
      <div id="content">

      </div>
    </div>
  );
}

export default App;
