#!/bin/python

## Created this file to insert records into the MongoDB database.

import requests

url = 'http://localhost:1984/get_recurring_transactions'
response = requests.get(url=url)
print response

"""
url = 'http://localhost:1984/upsert_transactions'

file = open("sample_transactions.csv","r");
file_objects = file.read();
count = 1
for file in file_objects.split("\n"):
	##print file
	##data = '{data:"'+file+'"}'
	data = file.split(",")
	print str(count)+": "+file
	print "data printed above, below is splitted data"
	print data[0],data[1],data[2],data[3],data[4]
	test_data = {'name':data[0],
				 'date':data[1],
				 'amount':data[2],
				 'trans_id':data[3],
				 'user_id':data[4]}
	##print test_data
	count = count+1
	response = requests.post(url=url,data=test_data)
"""
	##print response