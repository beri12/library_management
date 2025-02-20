# Copyright (c) 2025, D-codE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Book(Document):
	pass
@frappe.whitelist()
def loan_book(member_id, book_id):
    book = frappe.get_doc("Book", book_id)
    
    if not book.available:
        return {"error": "Book not available for loan"}
    
    loan = frappe.get_doc({
        "doctype": "Loan",
        "member": member_id,
        "book": book_id,
        "loan_date": frappe.utils.today()
    })
    loan.insert()
    
    book.available = 0
    book.save()
    
    return {"message": "Book loaned successfully"}
