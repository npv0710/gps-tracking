$(document).ready(function() {
    var tableUsers = null;
    var userId = null;

    function getListUsers () {
        let url = 'http://localhost:3000/users';
        $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',

            success: function(response) {
                console.log(response);

                createTableUser(response);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    getListUsers();
    
    function createTableUser(users) {
        let records = [];//số hàng

        for (let i = 0; i < users.length; i ++) {
            let item = [];
            item[0] = i + 1;
            item[1] = users[i].firstName;
            item[2] = users[i].lastName;
            item[3] = users[i].email;
            item[4] = users[i].id;
            records.push(item);
        }

        tableUsers = $('#table_users').DataTable({
            data: records,
            columns: [
                {title: 'STT'},
                {title: 'First Name'},
                {title: 'Last Name'},
                {title: 'Email'},
                {title: 'ID'}
            ],
            columnDefs: [
                {
                    target: 5,
                    width: 100,
                    render: function() {
                        return '<td>' +
                                '<button class="btn-actions edit" data-bs-toggle="modal" data-bs-target="#userModal"><i class="material-icons">&#xe3c9;</i></button>' +
                                '<button class="btn-actions delete"><i class="material-icons">&#xe872;</i></button>' +
                                '</td>';
                    }
                }
            ]
        })
    }


    function deleteUser (userId) {
        let url = 'http://localhost:3000/users/' + userId;
        $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',

            success: function(response) {
                console.log(response);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    $(document).on('click', 'td .delete', function() {
        // console.log($(this));
        // console.log($(this).parents('tr'));
        // console.log($(this).parents('tr').find('td'));
        // console.log($(this).parents('tr').find('td').eq(4));
        // console.log($(this).parents('tr').find('td').eq(4).html());

        let userId = parseInt($(this).parents('tr').find('td').eq(4).html());

        deleteUser(userId);
    })

    $(document).on('click', 'td .edit', function() {

        let index = parseInt($(this).parents('tr').find('td').eq(0).html()) - 1;
        let user = tableUsers.row(index).data();

        $('#exampleModalLabel').html('Edit User');

        $('#first_name').val(user[1]);
        $('#last_name').val(user[2]);
        $('#email').val(user[3]);

        userId = user[4];

        console.log(user);
    })

    function updateUser(userId, firstName, lastName, email) {
        let url = 'http://localhost:3000/users/' + userId;
        $.ajax({
            url: url,
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json',

            data: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email
            }),

            success: function(response) {
                console.log(response);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function addNewUser(firstName, lastName, email) {
        let url = 'http://localhost:3000/users';
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',

            data: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email
            }),

            success: function(response) {
                console.log(response);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    $('#btn_submit').click(function() {
        let firstName = $('#first_name').val();
        let lastName = $('#last_name').val();
        let email = $('#email').val();

        if ($('#exampleModalLabel').html() === 'Edit User') {
            updateUser(userId, firstName, lastName, email);
        }else {
            addNewUser(firstName, lastName, email);
        }
    })


    $('#btn_add_user').click(function(e) {
        e.preventDefault();
        $('#exampleModalLabel').html('Add User');
        $('#first_name').val('');
        $('#last_name').val('');
        $('#email').val('');
    })

})