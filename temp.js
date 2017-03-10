

function Person(first, last, age, gender, interests,skills) {
  
  // property and method definitions
  this.age = age;
  this.first_name = first;
  this.last_name = last;
  this.gender = gender;
  this.interests = interests;
  this.madSkills = skills;

  return this;

};

Person.prototype.Eat = function() {
	console.log("I am eating, don't bother me!");
};

Person.prototype.Ski= function(){
	this.speed = 60;
	console.log("I feel the need, the need for speed, and by that I mean  "+this.speed+" miles per hour!");
};

var _skills = ['consulting','CI/CD','mobile apps','SharePoint','AWS','Azure Cloud','JSON','Git','Jekyll'];
var _activities = ['skiing every weekend','chef cookbooks on my Macbook Pro','Jenkins CI for NodeJS','Docker Containers via Jenkins Pipelines'];

var oscar = new Person('Oscar', 'Medina', 21, 'male', _activities,_skills);

console.log(oscar);

