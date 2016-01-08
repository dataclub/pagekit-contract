<!-- Include Twitter Bootstrap and jQuery: -->
<link rel="stylesheet" href="http://davidstutz.github.io/bootstrap-multiselect/docs/css/bootstrap-3.3.2.min.css" type="text/css"/>
<script type="text/javascript" src="http://davidstutz.github.io/bootstrap-multiselect/docs/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="http://davidstutz.github.io/bootstrap-multiselect/docs/js/bootstrap-3.3.2.min.js"></script>

<!-- Include the plugin's CSS and JS: -->
<script type="text/javascript" src="http://davidstutz.github.io/bootstrap-multiselect/dist/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" href="http://davidstutz.github.io/bootstrap-multiselect/dist/css/bootstrap-multiselect.css" type="text/css"/>


<select multiple="multiple" id="example-enableClickableOptGroups-disabled" style="display: none;">
    <option value="1-1">Option 1.1</option>
    <option selected="selected" value="1-2">Option 1.2</option>
    <option selected="selected" value="1-3">Option 1.3</option>

</select>



$('#example-enableClickableOptGroups-disabled').multiselect({
includeSelectAllOption: true,
disableIfEmpty: true,
onChange: function(option, checked, select) {
//alert('Changed option ' + $(option).val() + '.');
},
maxHeight: 200,
nonSelectedText: this.$trans("None selected"),
selectAllText: this.$trans("Select all"),
onInitialized: function(select, container) {
//alert('Initialized.');
},
onDropdownShow: function(event) {
//alert('Dropdown shown.');
},
onDropdownHide: function(event) {
//alert('Dropdown closed.');
},
onDropdownShown: function(event) {
//alert('Dropdown closed.');
},
onDropdownHidden: function(event) {
//alert('Dropdown closed.');
},


});