var $tbody = document.querySelector("#myTableBody");
var $oneRowBtn = document.querySelector("#one");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $pager = document.querySelector("#myPager");

var count = 0;

$oneRowBtn.addEventListener("click", renderOneRow)
$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredUFOdata = dataSet;
console.log(dataSet)
$.fn.pageMe = function(opts){
  var $this = this,
      defaults = {
          perPage: 7,
          showPrevNext: false,
          hidePageNumbers: false
      },
      settings = $.extend(defaults, opts);

  var listElement = $this;
  var perPage = settings.perPage; 
  var children = listElement.children();
  var pager = $('.pager');

  if (typeof settings.childSelector!="undefined") {
      children = listElement.find(settings.childSelector);
  }

  if (typeof settings.pagerSelector!="undefined") {
      pager = $(settings.pagerSelector);
  }

  var numItems = children.size();
  var numPages = Math.ceil(numItems/perPage);

  pager.data("curr",0);

  if (settings.showPrevNext){
      $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
  }

  var curr = 0;
  while(numPages > curr && (settings.hidePageNumbers==false)){
      $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      curr++;
  }

  if (settings.showPrevNext){
      $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
  }

  pager.find('.page_link:first').addClass('active');
  pager.find('.prev_link').hide();
  if (numPages<=1) {
      pager.find('.next_link').hide();
  }
  pager.children().eq(1).addClass("active");

  children.hide();
  children.slice(0, perPage).show();

  pager.find('li .page_link').click(function(){
      var clickedPage = $(this).html().valueOf()-1;
      goTo(clickedPage,perPage);
      return false;
  });
  pager.find('li .prev_link').click(function(){
      previous();
      return false;
  });
  pager.find('li .next_link').click(function(){
      next();
      return false;
  });

  function previous(){
      var goToPage = parseInt(pager.data("curr")) - 1;
      goTo(goToPage);
  }

  function next(){
      goToPage = parseInt(pager.data("curr")) + 1;
      goTo(goToPage);
  }

  function goTo(page){
      var startAt = page * perPage,
          endOn = startAt + perPage;

      children.css('display','none').slice(startAt, endOn).show();

      if (page>=1) {
          pager.find('.prev_link').show();
      }
      else {
          pager.find('.prev_link').hide();
      }

      if (page<(numPages-1)) {
          pager.find('.next_link').show();
      }
      else {
          pager.find('.next_link').hide();
      }

      pager.data("curr",page);
      pager.children().removeClass("active");
      pager.children().eq(page+1).addClass("active");

  }
};
// while all search fields empty and no data showing, start row count at 0, then count++ with each button click
function renderOneRow() {
  if ($dateInput.value != '' || $cityInput.value != '' || $stateInput.value != '' || $countryInput.value != '' || $shapeInput.value != '') {
    $tbody.innerHTML = "";
    $pager.innerHTML = "";
    document.getElementById("date").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("shape").value = "";
  }

  var sighting = filteredUFOdata[count];
  var fields = Object.keys(sighting);
  
  var $row = $tbody.insertRow($tbody.rows.length);
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var $cell = $row.insertCell(i);
    $cell.innerText = sighting[field];
  }

  return count++;
}

function renderTable() {
  $tbody.innerHTML = "";
  $pager.innerHTML = "";
   
  for (var i = 0; i < filteredUFOdata.length; i++) {

    var sighting = filteredUFOdata[i];
    var fields = Object.keys(sighting);

    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
  $('#myTableBody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:1000});
}

function handleSearchButtonClick() {

  filteredUFOdata = dataSet;
  var filterArray = [{
    "key":"datetime",
    "value":$dateInput.value
},{
    "key":"city",
    "value":$cityInput.value.toLowerCase()
},{
    "key":"state",
    "value":$stateInput.value.toLowerCase()
},{
    "key":"country",
    "value":$countryInput.value.toLowerCase()
},{
    "key":"shape",
    "value":$shapeInput.value.toLowerCase()
}];

var tableData = dataSet;


filterArray.forEach(input => {
    var filterKey = input.key;
    var filterValue = input.value;
    
    if(filterValue == "") {
        return;
    } else {
        tableData = tableData.filter(sighting => {
            return filterValue === sighting[filterKey];
        });
    };
    
});
filteredUFOdata = tableData;
renderTable();

}

