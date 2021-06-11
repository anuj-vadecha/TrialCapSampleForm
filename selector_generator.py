thereputic=[
"Dermatology",
"Cardiovascular",
"Oncology",
"Rare Diseases",
"Psychiatry",
"Psychology",
"Hepatology",
"Endocrinology & Metabolic Diseases",
"ENT",
"Infectious Diseases",
"Respiratory",
"Neurology",
"Urology",
"Men's Health",
"Women's Health",
"Haematology",
"Soft & Connective Tissue",
"Ophthalmology",
"Internal Medicine",
"Musculoskeletal",
"Surgery",
"Pain & Analgesia",
"Toxicology & Poisoning",
"Immunology",
"Accident & Emergency",
"Obstetrics and Gynaecology",
"Nutrition & Weight Loss",
"Tissue & Regenerative Medicine",
"Others",
"Gastroenterology",
"Orthopedic",
"Nephrology",


]

import xlrd
loc = ("Questions.xlsx")
wb = xlrd.open_workbook(loc)
for x in range(7,10):
    sheet = wb.sheet_by_index(x)
    for j in range(2,sheet.ncols):
        valid_values = []
        for i in range(1,sheet.nrows):
            if(sheet.cell_value(i,j)!=''):
                valid_values+=[sheet.cell_value(i, 0)]

        therepeautic= sheet.cell_value(0,j)
        print("""if (document.getElementById(\""""+therepeautic.strip()+"""\").checked) { """)
        list=valid_values
        if(len(list)>0):
            for i in range(0,len(list)):
                if(" " in list[i]):
                    # if(therepeautic not in thereputic):
                    #     raise Exception("Incorrect mapping for "+therepeautic)
                    list[i]=list[i].replace(" ","\\\\ ")
                list[i]="#"+list[i]
            output= ",".join(list)
            output="""document.querySelectorAll(\" """+output+"""\").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})"""
            print(output)
        print("}")
