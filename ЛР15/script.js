function Math_output(){
    alert(Math.PI);
}
function DOM_output(){
    window.alert(navigator.userAgent);
}
function person_output(){
    const user = {
        name:"Max",
        age:18,
        display: function(){
            window.alert("Имя: "+this.name+", "+"Возраст: "+this.age)
        } 
    }
    user.display();
}