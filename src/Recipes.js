import React, { Component, useState } from "react";
import { firestore } from './plugins/firebase';
import "firebase/storage";
import recipe from './modules/recipe'

const Recipes = (props) => {
    const [recipes, setRecipes] = useState([]);

    const getFireData = () = {
        let db = firebase.dataBase();
        let ref = db.ref("recipe/");
        ref.orderByKey().limitToFIrst(10).on("value", snapshot => )
    }

};