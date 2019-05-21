var formInputStudent = document.getElementById('form-student');
var formTableStudent = document.getElementById('form-table-student');
var tableStudent = document.getElementById('table-student');
var phoneInput = document.getElementById('phone-input');
var studentName = document.getElementById('name-input');
var schoolInput = document.getElementById('school-input');
var genderSelect = document.getElementById('select-gender');

var NumberOfRecords = 0;
var selectedRowId = -1;
var rowColor = '#efcac4';
var lastRow;


formTableStudent.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedRowId == -1) {
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            // Delete row
            let currentRow = document.getElementById(selectedRowId);
            currentRow.parentNode.removeChild(currentRow);
            calculateTotalRecords();
            selectedRowId = -1;

            Swal.fire(
                'Deleted!',
                'Record has been deleted.',
                'success'
            )

        }
    })
})

const isValidInput = () => {
    let isValid = true;
    if (studentName.value == '') {
        $("#name-input").notify(
            "Please enter name!", {
                elementPosition: "buttom right",
                autoHideDelay: 1000,
            }
        );
        isValid = false;
    }
    if (schoolInput.value == '') {
        $("#school-input").notify(
            "Please enter school's name!", {
                elementPosition: "buttom right",
                autoHideDelay: 1000,
            }
        );
        isValid = false
    }
    let phone = phoneInput.value;
    let phonePattern = /[t]/gi;
    if (phone.length < 17 || phonePattern.test(phone)) {
        $("#phone-input").notify(
            "Please input the correct phone number!", {
                elementPosition: 'buttom right',
                autoHideDelay: 1000,
            }
        );
        isValid = false
    }
    if (isNaN(genderSelect.value)) {
        $("#select-gender").notify(
            "Please select a gender!", {
                elementPosition: 'buttom right',
                autoHideDelay: 1000,
            }
        );
        isValid = false
    }
    return isValid;

}

formInputStudent.addEventListener('submit', () => {
    if (!isValidInput())
        return;
    let tbody = tableStudent.getElementsByTagName('tbody')[0];
    // console.log(tbody);
    let phone = phoneInput.value;
    let name = studentName.value;
    let school = schoolInput.value;
    let gender = genderSelect.value;
    // console.log(phone.length);

    let arrStudent = [++NumberOfRecords, name, gender == 1 ? 'Female' : gender == 2 ? 'Male' : 'Other', school, phone];
    // Insert a row in the table at the last row
    var newRow = tbody.insertRow(tbody.rows.length);
    newRow.id = 'r' + NumberOfRecords;
    for (i = 0; i < 5; i++) {
        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(i);

        // Append a text node to the cell
        var newText = document.createTextNode(arrStudent[i]);
        newCell.appendChild(newText);
    }

    $.notify("Record has been added successfully!", "success");

    var createClickHandler = (row) => {
        return _ => {
            selectedRowId = row.id;
            console.log(lastRow);
            console.log(row);

            if (lastRow) {
                lastRow.style.backgroundColor = '';
                if (lastRow.id == row.id) {
                    row.style.backgroundColor = '';
                    selectedRowId = -1;
                } else {
                    row.style.backgroundColor = rowColor;
                }
            } else {
                row.style.backgroundColor = rowColor;
            }

            lastRow = row;
        };
    };
    newRow.onclick = createClickHandler(newRow);
    console.log(newRow);
    calculateTotalRecords();


})

function formatInput() {


    new Formatter(phoneInput, {
        'pattern': '(+855) {{19}}-{{999}}-{{9999}}',
        'persistent': false
    });


    new Formatter(studentName, {
        'pattern': '{{aaaaaaaaaaaaaaaaaaaaaaaa}}',
        'persistent': false
    });


    new Formatter(schoolInput, {
        'pattern': '{{nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn}}',
        'persistent': false
    })
}

function calculateTotalRecords() {
    var rows = tableStudent.getElementsByTagName('tbody')[0].getElementsByTagName("tr");
    let numsOfRow = 0;
    for (i = 0; i < rows.length; i++) {
        numsOfRow++;
    }
    document.getElementById('total-record').innerHTML = numsOfRow;
}

function initComponents() {
    formatInput();
}

window.onload = initComponents();