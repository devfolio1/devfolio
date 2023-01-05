import React, { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder, clearErrors, confirmOrder } from "../actions/orderAction";
import CheckoutSteps from "../components/CheckOutSteps";
import NotFound from "../components/Layouts/NotFound";
import myclone from "../images/myclone.png";

const Buynow = ({ history}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  // const [instagram, setInstagram] = useState("")
  const [about, setAbout] = useState("");
  const [twitter, setTwitter] = useState("");
  const [dp, setDp] = useState("");
  const [inputList, setInputList] = useState([
    { service: "", description: "" },
  ]);
  const [projectList, setProjectList] = useState([
    { project: "", pdescription: "" },
  ]);

  const [Page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {cost} = useSelector((state)=>state.cost)

  const [autocompleteValues, setAutocompleteValues] = useState([]);
  const newSkill = []

  autocompleteValues.forEach((autocompleteValues) => {
    for (let key in autocompleteValues) {
     newSkill.push(autocompleteValues[key])
    }
  })

  const handleChange = (event, value) => {
    setAutocompleteValues(value);
  };

  // console.log(autocompleteValues);

  const proceedtoPay = () => {
    const services = allServices.toString();
    const projects = allProjects.toString();

    const order1 = {
      username,
      email,
      linkedin,
      github,
      about,
      twitter,
      dp,
      services,
      autocompleteValues,
      projects,
    };

    dispatch(createOrder(order1));

    //sending details to confirm order

    dispatch(confirmOrder(order1));

    setPage(4);
  };

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("/api/v1/getkey");

    const {
      data: { order },
    } = await axios.post("/api/v1/checkout", {
      amount,
    });


    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "DevFolio",
      description: "payment for portfolio",
      // image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/v1/paymentverification",
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();

    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "jeyn7uq9");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/dnx8obvhi/image/upload",
      options
    ).then((res) => setDp(JSON.stringify(res)));

   
  };
console.log(cost)


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  //for projects

  const handleProjectInputChange = (e, index) => {
    const { name, value } = e.target;
    const plist = [...projectList];
    plist[index][name] = value;
    setProjectList(plist);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  //for projects

  const handlProjecteRemoveClick = (index) => {
    const plist = [...projectList];
    plist.splice(index, 1);
    setProjectList(plist);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { service: "", description: "" }]);
  };

  //for projects

  const handleProjectAddClick = () => {
    setProjectList([...projectList, { project: "", pdescription: "" }]);
  };

  var allServices = [];
  var allProjects = [];
  for (let i = 0; i < inputList.length; i++) {
    allServices.push(inputList[i].service);
  }
  //for projects
  for (let i = 0; i < projectList.length; i++) {
    allProjects.push(projectList[i].project);
  }

  return (
    <>
      {(Page === 1 && JSON.stringify(cost)!='{}' )&& (
        <>
          <CheckoutSteps activeStep={0} />

          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
            <form>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label class="text-gray-700 " for="username">
                    User Name
                  </label>
                  <input
                    size="small"
                    id="username"
                    name="username"
                    value={username}
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label class="text-gray-700 " for="email">
                    Email
                  </label>

                  <input
                    size="small"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="p-5 grid gap-4">
                <div className="linkedin">
                  {" "}
                  <label class="text-gray-700 " for="linkedin">
                    linkedin URL
                  </label>
                  <input
                    size="small"
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    value={linkedin}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                    }}
                  />
                </div>
                <div className="github">
                  <label class="text-gray-700 " for="github">
                    GitHub URL
                  </label>
                  <input
                    size="small"
                    id="github"
                    name="github"
                    type="text"
                    value={github}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setGithub(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="instagram">
                  <label class="text-gray-700 " for="instagram">
                    Instagram URL
                  </label>
                  <input
                    size="small"
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={instagram}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setInstagram(e.target.value);
                    }}
                  />
                </div> */}
                <div className="twitter">
                  <label class="text-gray-700 " for="twitter">
                    twitter URL
                  </label>
                  <input
                    size="small"
                    id="twitter"
                    name="twitter"
                    type="text"
                    value={twitter}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setTwitter(e.target.value);
                    }}
                  />
                </div>
                <div className="about">
                  <label class="text-gray-700 " for="twitter">
                    About You
                  </label>
                  <input
                    size="small"
                    id="about"
                    name="about"
                    type="text"
                    value={about}
                    placeholder="ex: i'm a frontend dev, i have worked in xyz comapany...."
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    required
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  type="submit"
                  onClick={() => {
                    setPage(2);
                  }}
                  class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </form>
          </section>
        </>
      )}
      {Page === 2 && (
        <>
          <CheckoutSteps activeStep={1} />

          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
            <form>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <input type="file" />
                </div>

                <button
                  type="button"
                  className="w-1/4 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  onClick={() => {
                    handleImageUpload();
                  }}
                >
                  Submit
                </button>
                <label class="text-gray-700 mt-5" for="service">
                  SERVICES YOU OFFER:
                </label>
              </div>
              {inputList.map((x, i) => {
                return (
                  <>
                    <div className="box grid grid-cols-4 gap-10 mt-4 sm:grid-cols-3 mb-5">
                      <input
                        name="service"
                        placeholder="Enter Services you offer"
                        value={x.service}
                        onChange={(e) => handleInputChange(e, i)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                      <input
                        className="ml-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        name="description"
                        placeholder="description about your service"
                        value={x.description}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <div className="btn-box p-4 flex gap-4">
                        {inputList.length !== 1 && (
                          <button
                            className="px-4 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}
                        {inputList.length - 1 === i && (
                          <button
                            onClick={handleAddClick}
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
              <div>
                <label class="text-gray-700 pt-5" for="project">
                  PROJECTS:
                </label>
              </div>
              {projectList.map((y, j) => {
                return (
                  <>
                    <div className="box grid grid-cols-4 gap-10 sm:grid-cols-3">
                      <input
                        name="project"
                        placeholder="Project Title"
                        value={y.project}
                        onChange={(e) => handleProjectInputChange(e, j)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                      />
                      <input
                        className="ml-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        name="pdescription"
                        placeholder="description / link to your project"
                        value={y.pdescription}
                        onChange={(e) => handleProjectInputChange(e, j)}
                      />
                      <div className="btn-box p-4 flex gap-4">
                        {projectList.length !== 1 && (
                          <button
                            className="px-4 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            onClick={() => handlProjecteRemoveClick(j)}
                          >
                            Remove
                          </button>
                        )}
                        {projectList.length - 1 === j && (
                          <button
                            onClick={handleProjectAddClick}
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="mt-4">
                <label class="text-gray-700 mt-5" for="service">
                  SKILLS : 
                </label>
              </div>

              <Stack spacing={3} sx={{ width: 500 }}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={allSkills}
                  getOptionLabel={(option) => option.skill}
                  value={autocompleteValues}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      
                      placeholder="skills"
                    />
                  )}
                />
              </Stack>

              <div class="flex justify-end mt-6">
                <button
                  type="submit"
                  onClick={() => {
                    setPage(3);
                  }}
                  class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </form>
          </section>
        </>
      )}
      {Page === 3 && (
        <>
          <CheckoutSteps activeStep={2} />
          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
            <h1 class="text-3xl font-semibold tracking-wide text-gray-800  lg:text-4xl">
              Confirm Your Details
            </h1>
            <p className="text-red-300 p-4">
              NOTE*: all these details will be reflected in your portfolio
            </p>
            <div className="grid grid-cols-1">
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">User Name :</label>
                <p>{username}</p>
              </div>
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Email :</label>
                <p>{email}</p>
              </div>
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">LinkedIn URL :</label>
                <p>{linkedin}</p>
              </div>
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">GitHub URL :</label>
                <p>{github}</p>
              </div>
             
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Twitter URL :</label>
                <p>{twitter}</p>
              </div>
              {/* <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Instagram URL :</label>
                <p>{instagram}</p>
              </div> */}
              {/* <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">DP :</label>
                <p>{dp}</p>
              </div> */}
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Services :</label>
                <p>{allServices.toString()}</p>
              </div>
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Projects :</label>
                <p>{allProjects.toString()}</p>
              </div>
              <div className="flex gap-4 mx-auto">
                <label class="text-gray-700 font-bold ">Skills :</label>
                <p>
                  {newSkill.toString()}
                </p>
              </div>
              <div class="flex justify-end mt-6">
                <button
                  type="submit"
                  onClick={() => {
                    proceedtoPay();
                  }}
                  class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </section>
        </>
      )}
      {Page === 4 && (
        <>
          <CheckoutSteps activeStep={3} />
          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md grid gap-10">
            <h1 class="text-3xl font-semibold tracking-wide text-gray-800  lg:text-4xl mx-auto">
              Pay for Your Portfolio
            </h1>
            <p className="tracking-wide text-gray-800  mx-auto">You will have it with your details filled in!!</p>
            {cost===200 && (<>
              <div
              class="overflow-hidden bg-cover rounded-lg cursor-pointer h-80 group"
              style={{ backgroundImage: `url(${myclone})` }}
            >
            
              
            </div>
            </>)}
            <button
              type="submit"
              onClick={() => {
                checkoutHandler(cost);
              }}
              class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Pay ₹{cost}
            </button>
          </section>
        </>
      )}
      {JSON.stringify(cost)==='{}' && (
        <NotFound/>
      )}
    </>
  );
};

const allSkills = [
  { skill: "HTML" },
  { skill: "CSS" },
  { skill: "JAVASCRIPT" },
  { skill: "REACT.js" },
  { skill: "NODE.js" },
  { skill: "MONGO DB" },
  { skill: "EXPRESS.js" },
  { skill: "LINUX" },
  { skill: "DOCKER" },
  { skill: "KUBERNETES" },
  { skill: "POSTGRES" },
  { skill: "mySQL" },
  { skill: "PHP" },
  { skill: "PYTHON" },
  { skill: "JAVA" },
  { skill: "C programming" },
  { skill: "C++" },
  { skill: "AZURE" },
  { skill: "AWS" },
  { skill: ".NET" },
  { skill: "BOOTSTRAP" },
  { skill: "TAILWIND.css" },
  { skill: "CHAKRA UI" },
  { skill: "MATERIAL UI" },
  { skill: "AJAX" },
  { skill: "DATA STRUCTURES AND ALGORITHEMS" },
  { skill: "ANDROID" },
  { skill: "FLUTTER" },
  { skill: "REACT NATIVE" },
  { skill: "ANGULAR.js" },
  { skill: "DJANGO" },
  { skill: "APACHE" },
  { skill: "ARDUINO" },
  { skill: "AXURE" },
  { skill: "C#" },
  { skill: "CMS" },
  { skill: "WORDPRESS" },
  { skill: "CLOUD COMPUTING" },
  { skill: "BIG DATA" },
  { skill: "IOT" },
  { skill: "DATA SCIENCE" },
  { skill: "DATA WAREHOUSE" },
  { skill: "DATABASE ADMINISTRATION" },
  { skill: "DRUPAL" },
  { skill: "DATA ENTRY" },
  { skill: "HEROKU" },
  { skill: "VERCEL" },
  { skill: "jQUERY" },
  { skill: "R programming language" },
  { skill: "RED HAT" },
  { skill: "SEO" },
  { skill: "RUST" },
];

export default Buynow;
