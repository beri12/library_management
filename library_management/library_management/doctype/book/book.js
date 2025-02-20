// Copyright (c) 2025, D-codE and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Book", {
// 	refresh(frm) {

// 	},
// });



frappe.pages['library-books'].on_page_load = function(wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Library Books',
        single_column: true
    });

    frappe.call({
        method: 'library_app.api.get_available_books',
        callback: function(r) {
            let books = r.message;
            let html = '<table class="table"><tr><th>Title</th><th>Author</th><th>Loan</th></tr>';
            books.forEach(book => {
                html += `<tr><td>${book.title}</td><td>${book.author}</td>
                <td><button class="btn btn-primary" onclick="loanBook('${book.name}')">Loan</button></td></tr>`;
            });
            html += '</table>';
            $(wrapper).html(html);
        }
    });
};
