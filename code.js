//var url = "http://localhost:3000";
var url = "https://createresume.herokuapp.com";

var app= new Vue ({
    el: "#app1",

    data: {
      username: "", 
      password: "", 
      userID: "",
      menu:false,
      modal: false,
      page: "form",
      color: "",

        educationlist:[],
        workexplist:[            
        ],
        accomplishmentlist: [],
        extracurricularlist:[],
        languageslist:[],
        programslist:[],
        softskillslist:[],
        awardslist:[],
        statementlist:[],

        
        personalinfoEdit:
        {
            first_name:"",
            last_name:"",
            address: "",
            city:"",
            state:"",
            zip:"", 
            country: "",
            email: "",
            phone: "",
            branding_statement: "",
            professional_title: "",
            linkedin: "",
            user_id: ""
        },
        statementEdit: {
          statement: "",
          user_id: ""
        },
        workexpEdit: {
            company: "",
            title: "",
            startdate: new Date().toISOString().substr(0, 10),
            enddate: new Date().toISOString().substr(0, 10),
            description: "",
            start_menu: false,
            end_menu: false,
            user_id: ""
        },
        educationEdit: {
          college: "",
          degree: "",
          gradyear: new Date().toISOString().substr(0, 10),
          menu: false,
          user_id: ""
        },
        accomplishmentEdit: {
          title: "",
          description: "",
          user_id: ""
        },
        extracurricularEdit: {
          title: "",
          description: "",
          date: "",
          user_id: ""
        },
        languagesEdit: {
          title: "",
          proficiency:  "",
          user_id: ""
        },
        programsEdit: {
          title: "",
          proficiency:  "",
          user_id: ""
        },
        softskillsEdit: {
          title: "",
          user_id: ""
        },
        awardsEdit: {
          title: "",
          receivedfrom:  "",
          date: new Date().toISOString().substr(0, 10),
          description: "",
          menu:false,
          user_id: ""
        },
        proficiencylist: [
          "Beginner",
          "Intermediate",
          "Proficient",
          "Advanced",
          "Expert"
        ],
        colors: [
            "orange",
            "black",
            "red",
            "blue",
            "green"
        ],
        selected_color_main: "",
        selected_color_accent: "",
        pickingColorMain: false,
        pickingColor: false,
        color_brightness: 6,
        accent: 0,
        
      template: "malia",
      templateLabel: "Choose a Template",
      templates: [
        {
          model: "malia",
          name: "Template 1"
        },
        {
          model: "hannah",
          name: "Template 2"
        },
        {
          model: "taft",
          name: "Template 3"
        },
        {
          model: "sharon",
          name: "Template 4"
        },
      ],
      
      statementdisplay: [],
      workexpdisplay: [],
      educationdisplay: [],
      accomplishmentdisplay: [],
      extracurriculardisplay: [],
      languagesdisplay: [],
      programsdisplay: [],
      softskillsdisplay: [],
      awardsdisplay: [],

      add_remove: "",

      statementposition: 0,
      workexpposition: 0,
      educationposition: 0,
      accomplishmentposition: 0,
      extracurricularposition: 0,
      languagesposition: 0,
      programsposition: 0,
      softskillsposition: 0,
      awardsposition: 0,

      position1: {},

      zone1: [],
      zone2: [],
      zone3: [],
      zone4: [],
      zone5: [],
      zone6: [],
      zone7: [],

      zone1_type: "",
      zone2_type: "",
      zone3_type: "",
      zone4_type: "",
      zone5_type: "",
      zone6_type: "",
      zone7_type: "",

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      fieldRules: [
        v => !!v || 'This field is required',
      ],
    },
    created: function () {
      addEventListener("click", function () {
        app.selected_color_main = document.getElementById("colorMain").style.backgroundColor;
        app.selected_color_accent = document.getElementById("colorAccent").style.backgroundColor;
      }, {passive: true});
    },
  

    methods: {
      loadlists: function() {
        app.checklogin();
        app.getData("statement");
        app.getData("workexp");
        app.getData("education");
        app.getData("accomplishment");
        app.getData("extracurricular");
        app.getData("language");
        app.getData("program");
        app.getData("softskill");
        app.getData("award");
        },

      register: function() {
  			fetch(`${url}/users/register`, {
  				method: "POST",
  				credentials: "include",
  				headers: {
  					"Content-type": "application/json"
  				},
  				body: JSON.stringify({
  					username: this.username,
  					password: this.password
  				})
  			}).then(function(response) {
  				if (response.status == 422 || response.status == 400) {
  					response.json().then(function(data) {
  						alert(data.msg);
  					})
  				} else if (response.status == 201) {
  					console.log("registered");
  				}
  			});
  		},

  		login: function() { //CHANGED by TAFT
        console.log(this.username);
  			fetch(`${url}/users/login`, {
  				method: "POST",
  				credentials: "include",
  				headers: {
  					"Content-type": "application/json"
  				},
  				body: JSON.stringify({
  					username: this.username,
  					password: this.password
  				})
  			}).then(function(response) {
  				if (response.status == 403) {
  					response.json().then(function(data) {
  						alert(data.msg);
  					})
  				}else if(response.status == 200){
            alert("logged in");
            response.json().then( function(data){
              app.userID = data.user_id
              app.page = "form";
              app.loadlists();

            })

          }
  			});
  		},

      phoneNum: function () {
        var x = this.personalinfoEdit.phone.replace(/\D/g, '').match(`(\d{0,3})(\d{0,3})(\d{0,4})`);
        return (
          x = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
        );
      },

      includeStatement: function(exp) {
        this.statementdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeWork: function(exp) {
        this.workexpdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeEducation: function(exp) {
        this.educationdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeAccomplishment: function(exp) {
        this.accomplishmentdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeAward: function(exp) {
        this.awardsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeProgram: function(exp) {
        this.programsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeSkill: function(exp) {
        this.softskillsdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeExtracurricular: function(exp) {
        this.extracurriculardisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },
      includeLanguage: function(exp) {
        this.languagesdisplay.push(exp);
        this.add_remove = "remove";
        return true;
      },


      apply: function (type) {
        var display = [];
        if (type == "workexp") {
          display = this.workexpdisplay;
          if (this.workexpposition == "1") {
            this.apply1(type,display,);
          }
          else if (this.workexpposition == "2") {
            this.apply2(type,display);
          }
          else if (this.workexpposition == "3") {
            this.apply3(type,display);
          }
          else if (this.workexpposition == "4") {
            this.apply4(type,display);
          }
          else if (this.workexpposition == "5") {
            this.apply5(type,display);
          }
          else if (this.workexpposition == "6") {
            this.apply6(type,display);
          }
          else if (this.workexpposition == "7") {
            this.apply7(type,display);
          }
        }
        else if (type == "education") {
          display = this.educationdisplay;
          if (this.educationposition == "1") {
            this.apply1(type, display);
          }
          else if (this.educationposition == "2") {
            this.apply2(type, display);
          }
          else if (this.educationposition == "3") {
            this.apply3(type, display);
          }
          else if (this.educationposition == "4") {
            this.apply4(type, display);
          }
          else if (this.educationposition == "5") {
            this.apply5(type, display);
          }
          else if (this.educationposition == "6") {
            this.apply6(type, display);
          }
          else if (this.educationposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "statement") {
          display = this.statementdisplay;
          if (this.statementposition == "1") {
            this.apply1(type, display);
          }
          else if (this.statementposition == "2") {
            this.apply2(type, display);
          }
          else if (this.statementposition == "3") {
            this.apply3(type, display);
          }
          else if (this.statementposition == "4") {
            this.apply4(type, display);
          }
          else if (this.statementposition == "5") {
            this.apply5(type, display);
          }
          else if (this.statementposition == "6") {
            this.apply6(type, display);
          }
          else if (this.statementposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "accomplishment") {
          display = this.accomplishmentdisplay;
          if (this.accomplishmentposition == "1") {
            this.apply1(type, display);
          }
          else if (this.accomplishmentposition == "2") {
            this.apply2(type, display);
          }
          else if (this.accomplishmentposition == "3") {
            this.apply3(type, display);
          }
          else if (this.accomplishmentposition == "4") {
            this.apply4(type, display);
          }
          else if (this.accomplishmentposition == "5") {
            this.apply5(type, display);
          }
          else if (this.accomplishmentposition == "6") {
            this.apply6(type, display);
          }
          else if (this.accomplishmentposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "award") {
          display = this.awardsdisplay;
          if (this.awardsposition == "1") {
            this.apply1(type, display);
          }
          else if (this.awardsposition == "2") {
            this.apply2(type, display);
          }
          else if (this.awardsposition == "3") {
            this.apply3(type, display);
          }
          else if (this.awardsposition == "4") {
            this.apply4(type, display);
          }
          else if (this.awardsposition == "5") {
            this.apply5(type, display);
          }
          else if (this.awardsposition == "6") {
            this.apply6(type, display);
          }
          else if (this.awardsposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "language") {
          display = this.languagesdisplay;
          if (this.languagesposition == "1") {
            this.apply1(type, display);
          }
          else if (this.languagesposition == "2") {
            this.apply2(type, display);
          }
          else if (this.languagesposition == "3") {
            this.apply3(type, display);
          }
          else if (this.languagesposition == "4") {
            this.apply4(type, display);
          }
          else if (this.languagesposition == "5") {
            this.apply5(type, display);
          }
          else if (this.languagesposition == "6") {
            this.apply6(type, display);
          }
          else if (this.languagesposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "extracurricular") {
          display = this.extracurricularndisplay;
          if (this.extracurricularnposition == "1") {
            this.apply1(type, display);
          }
          else if (this.extracurricularnposition == "2") {
            this.apply2(type, display);
          }
          else if (this.extracurricularnposition == "3") {
            this.apply3(type, display);
          }
          else if (this.extracurricularnposition == "4") {
            this.apply4(type, display);
          }
          else if (this.extracurricularnposition == "5") {
            this.apply5(type, display);
          }
          else if (this.extracurricularnposition == "6") {
            this.apply6(type, display);
          }
          else if (this.extracurricularnposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "programs") {
          display = this.programsdisplay;
          if (this.programsposition == "1") {
            this.apply1(type, display);
          }
          else if (this.programsposition == "2") {
            this.apply2(type, display);
          }
          else if (this.programsposition == "3") {
            this.apply3(type, display);
          }
          else if (this.programsposition == "4") {
            this.apply4(type, display);
          }
          else if (this.programsposition == "5") {
            this.apply5(type, display);
          }
          else if (this.programsposition == "6") {
            this.apply6(type, display);
          }
          else if (this.programsposition == "7") {
            this.apply7(type, display);
          }
        }
        else if (type == "skills") {
          display = this.softskillsdisplay;
          if (this.softskillsposition == "1") {
            this.apply1(type, display);
          }
          else if (this.softskillsposition == "2") {
            this.apply2(type, display);
          }
          else if (this.softskillsposition == "3") {
            this.apply3(type, display);
          }
          else if (this.softskillsposition == "4") {
            this.apply4(type, display);
          }
          else if (this.softskillsposition == "5") {
            this.apply5(type, display);
          }
          else if (this.softskillsposition == "6") {
            this.apply6(type, display);
          }
          else if (this.softskillsposition == "7") {
            this.apply7(type, display);
          }
        }
      },


      apply1: function (type, display) {
          this.zone1 = display;
          this.zone1_type = type;
      },
      apply2: function (type, display) {
        this.zone2 = display;
        this.zone2_type = type;
      },
      apply3: function (type, display) {
          this.zone3 = display;
          this.zone3_type = type;
      },
      apply4: function (type, display) {
          this.zone4 = display;
          this.zone4_type = type;
      },
      apply5: function (type, display) {
          this.zone5 = display;
          this.zone5_type = type;
      },
      apply6: function (type, display) {
          this.zone6 = display;
          this.zone6_type = type;
      },
      apply7: function (type, display) {
          this.zone7 = display;
          this.zone7_type = type;
      },
      

      newKellyColorPickerMain: function () {
        if (this.pickingColorMain == false) {
          new KellyColorPicker({
            place : 'color-picker-main',
            size : 150,
            input : 'colorMain',
            method: 'triangle',
            input_format: "rgba",
            alpha_slider: true,
            display: 'block',
          });
          this.pickingColorMain = true;
        } else if (this.pickingColorMain == true || this.pickingColor == true) {
          this.pickingColorMain = false;
          this.pickingColor = false;
        };
      },
      newKellyColorPickerAccent: function () {
        if (this.pickingColor == false) {
          new KellyColorPicker({
            place : 'color-picker-accent',
            size : 150,
            input : 'colorAccent',
            method: 'triangle',
            input_format: "rgba",
            alpha_slider: true,
            display: 'block',
          });
          this.pickingColor = true;
        } else if (this.pickingColorMain == true || this.pickingColor == true) {
          this.pickingColorMain = false;
          this.pickingColor = false;
        };
      },


      pdfSave: function () {
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML($('#resume').html(), 15, 15, {
          'width': 170,
          'elementHandlers': specialElementHandlers
        });
        doc.save(this.personalinfoEdit.first_name+'_Resume.pdf');
      },

      checklogin: function(){//ADDED BY TAFT
        fetch(`${url}/users/checklogin`, {
  				method: "GET",
  				credentials: "include",
  			}).then(function(response) {
  				if (response.status == 403) {
  					response.json().then(function(data) {
  						alert(data.msg);
              app.userID = ""
              app.page = "login"
  					})
  				}else if(response.status == 200){
            response.json().then( function(data){
              app.userID = data.user_id

            })

          }
  			});

      },
  

      getData: function(want) {
        fetch(`${url}/${want}`,{
          credentials: "include"
        }).then(function (response) { //then executes when browser has received response from browser
          response.json().then(function (data) {
  
            if(want=="statement"){
              app.statementlist = data.statementlist
            }
            if(want=="workexp"){
              app.workexplist = data.workexplist
            }
            if(want=="education"){
              app.educationlist = data.educationlist
            }
            if(want=="accomplishment"){
              app.accomplishmentlist = data.accomplishmentlist
            }
            if(want=="extracurricular"){
              app.extracurricularlist = data.extracurricularlist
            }
            if(want=="language"){
              app.languageslist = data.languagelist
            }
            if(want=="program"){
              app.programslist = data.programlist
            }
            if(want=="softskill"){
              app.softskillslist = data.softskilllist
            }
            if(want=="award"){
              app.awardslist = data.awardlist
            }
  
            });
          });
        },

        submitStatement: function (){ //ADDED BY TAFT
          app.statementEdit.user_id = app.userID
          fetch(`${url}/statement`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.statementEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.statementEdit=
           {
            statement: ""
          }
          app.getData("statement");

        });


        },

        submitNewWorkexp: function (){
          app.workexpEdit.user_id = app.userID
          fetch(`${url}/workexp`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.workexpEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.workexpEdit={
            company: "",
            title: "",
            startdate: new Date().toISOString().substr(0, 10),
            enddate: new Date().toISOString().substr(0, 10),
            description: "",
            start_menu: false,
            end_menu: false,
            position: 0,
          }
          app.getData("workexp");

        });


        },

        submitEducation: function (){ //ADDED BY TAFT
          app.educationEdit.user_id = app.userID
          fetch(`${url}/education`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.educationEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})



          app.educationEdit=
           {
            college: "",
            degree: "",
            gradyear: new Date().toISOString().substr(0, 10),
            menu: false
          }
          app.getData("education");

        });


        },

        submitAccomplishment: function (){ //ADDED BY TAFT
          app.accomplishmentEdit.user_id = app.userID
          fetch(`${url}/accomplishment`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.accomplishmentEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.accomplishmentEdit=
           {
            title: "",
            description: "",
          }
          app.getData("accomplishment");

        });


        },

        submitLanguage: function (){ //ADDED BY TAFT
          app.languagesEdit.user_id = app.userID
          fetch(`${url}/language`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.languagesEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.languagesEdit=
           {
              title: "",
              proficiency:  "",
            }
          app.getData("language");

        });


        },

        submitProgram: function (){ //ADDED BY TAFT
          app.programsEdit.user_id = app.userID
          fetch(`${url}/program`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.programsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.programsEdit=
           {
              title: "",
              proficiency:  "",
            }
          app.getData("program");

        });


        },
        submitAward: function (){ //ADDED BY TAFT
          app.awardsEdit.user_id = app.userID
          fetch(`${url}/award`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.awardsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.awardsEdit=
           {
            title: "",
            receivedfrom:  "",
            date: new Date().toISOString().substr(0, 10),
            description: "",
            menu:false
          }
          app.getData("award");

        });


        },

        submitExtracurricular: function (){ //ADDED BY TAFT
          app.extracurricularEdit.user_id = app.userID
          fetch(`${url}/extracurricular`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.extracurricularEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.extracurricularEdit=
           {
            title: "",
            description: "",
            date: "",
          }
          app.getData("extracurricular");

        });


        },
        submitSoftskill: function (){ //ADDED BY TAFT
          fetch(`${url}/softskill`, {
            credentials: "include",
            method:"POST",
            headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(app.softskillsEdit)
        }).then(function (response) {
          //response.json().then((data)=>{console.log(data.msg)})

          app.softskillsEdit=
           {
            title: "",
          }
          app.getData("softskill");

        });

        },

        deleteItem:  function(thing,item){
          console.log("Trying to deletes")
          fetch(`${url}/${thing}/${item._id}`,
          {
            credentials: "include",
            method: "DELETE"
          }).then(function(response){
            if (response.status == 204){
              console.log("Deleted Item")
              app.getData(thing);
            } else if(response.status == 400){
              response.json().then(function(data){
                alert(data.msg)
              })
            }

          });

        },



    },

    computed: {
        
      },
})