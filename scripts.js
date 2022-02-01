let dataJson = {}

const fetchData = () => {
  const url = 'https://makeup-api.herokuapp.com/api/v1/products.json';
  fetch(url, {
    method: 'get'
  })
  .then((response) => {
    response.json().then((data) => {
      dataJson = data;
      orderByRating();
    });
  })
  .catch(function(err) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").insertAdjacentHTML(
      'afterend',
      `
      <div class="error-message">
        <p>Sorry! We have problmes to fetch the product list. Please refresh the page and try again! :( </p>
        <p>We appologies for any incovenience.</p>
      </div>
      `
    );
    console.error(err);
  });
}

const createCard = (makeupItem) => {
  document.getElementById("results").insertAdjacentHTML(
    'beforeend',
   `
   <div class="col mb-4 fade">
         <div class="card h-100 shadow-sm">
         <img src="https:${makeupItem.api_featured_image}" alt="${makeupItem.name}" width="100%" height="380">

           <div class="card-body">
             <div class="card-text">
               <div class="brand-text">${makeupItem.brand ? `By <b>${makeupItem.brand}</b>` : ""}</div>
               <div class="product-name">${makeupItem.name}</b></div>
             </div>
             <div class="d-flex justify-content-between align-items-center">
               <div class="text">
                 <i class="bi bi-cart4"></i>
                 R$ ${Number(makeupItem.price * 5.5).toFixed(2)}
               </div>
               <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseDetails-${makeupItem.id}" aria-expanded="false" aria-controls="collapseDetails-${makeupItem.id}">
                  Details
                </button>
               </div>
             </div>
             <div class="collapse" id="collapseDetails-${makeupItem.id}">
              <div class="card card-body">
                <div class="card_brand">
                  Brand: ${makeupItem.brand ? makeupItem.brand : ""}
                </div>
                <div class="card_price">
                  Price: R$ ${makeupItem.price ? Number(makeupItem.price * 5.5).toFixed(2) : 0.00}
                </div>
                <div class="card_rating">
                  Rating: ${makeupItem.rating ? makeupItem.rating : 0.00}
                </div>
                <div class="card_category">
                  Category: ${makeupItem.category ? makeupItem.category : ""}
                </div>
                <div class="card_product_type">
                  Product Type: ${makeupItem.product_type ? makeupItem.product_type : ""}
                </div>
              </div>
            </div>
           </div>
         </div>
       </div>
   `
 );
}

const orderByName = () => {
  document.getElementById("results").innerHTML = "";
  document.getElementById("loading").style.display = "block";

  const inputName = document.getElementById("makeup_name").value;

  let filteredList = [];

  if(inputName === ""){
    filteredList = dataJson;
  } else {
    dataJson.forEach((makeupItem, i) => {
      if(makeupItem.name.includes(inputName)){
        filteredList.push(makeupItem);
      }
    });
  }

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");
  refreshSelectPicker("selectpicker__orderby");

}

const orderByBrand = () => {
  document.getElementById("results").innerHTML = "";
  document.getElementById("loading").style.display = "block";

  const selectedBrand = document.getElementById("selectpicker__brand").value;

  let filteredList = [];

  if(selectedBrand === ""){
    filteredList = dataJson;
  } else {
    dataJson.forEach((makeupItem, i) => {
      if(makeupItem.brand === selectedBrand){
        filteredList.push(makeupItem);
      }
    });
  }

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__type");
  refreshSelectPicker("selectpicker__orderby");

}

const orderByType = () => {
  document.getElementById("results").innerHTML = "";
  document.getElementById("loading").style.display = "block";

  const selectedType = document.getElementById("selectpicker__type").value;

  let filteredList = [];

  if(selectedType === ""){
    filteredList = dataJson;
  } else {
    dataJson.forEach((makeupItem, i) => {
      if(makeupItem.product_type === selectedType){
        filteredList.push(makeupItem);
      }
    });
  }

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__orderby");
}

const orderBy = () => {

  document.getElementById("results").innerHTML = "";
  document.getElementById("loading").style.display = "block";

  const selectedOrderByType = document.getElementById("selectpicker__orderby").value;

  switch (selectedOrderByType) {
    case 'rating':
      orderByRating();
      break;
    case 'lowerprice':
      orderByLowerPrice();
      break;
    case 'higherprice':
      orderByHigherPrice();
      break;
    case 'az':
      orderByAz();
      break;
    case 'za':
      orderByZa();
      break;
    default:
      null;
  }

}

const orderByRating = () => {

  let filteredList = [];

  filteredList = [...dataJson].sort((a,b) => {
    let aRating = a.rating ? a.rating : 0;
    let bRating = b.rating ? b.rating : 0;
    return bRating - aRating;
  });

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");

}

const orderByLowerPrice = () => {

  let filteredList = [];

  filteredList = [...dataJson].sort((a,b) => Number(a.price) - Number(b.price));

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");

}

const orderByHigherPrice = () => {

  let filteredList = [];

  filteredList = [...dataJson].sort((a,b) => Number(b.price) - Number(a.price));

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");

}

const orderByAz = () => {

  let filteredList = [];

  filteredList = [...dataJson].sort(function(a,b){
    return a.name.localeCompare(b.name);
  })

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");

}

const orderByZa = () => {

  let filteredList = [];

  filteredList = [...dataJson].sort((a,b) => {
    return b.name.localeCompare(a.name);
  })

  document.getElementById("loading").style.display = "none";

  filteredList.forEach((makeupItem, i) => {
    createCard(makeupItem);
  });

  document.getElementById("makeup_name").value = "";
  refreshSelectPicker("selectpicker__brand");
  refreshSelectPicker("selectpicker__type");

}

const refreshSelectPicker = (selectPickerID) => {
  $(`#${selectPickerID}`).val('default');
  $(`#${selectPickerID}`).selectpicker("refresh");
}

fetchData();
