
import xlrd
loc = ("questions.xlsx")
wb = xlrd.open_workbook(loc)
for x in range(6,9):
    sheet = wb.sheet_by_index(x)
    for j in range(2,sheet.ncols):
        valid_values = []
        for i in range(1,sheet.nrows):
            if(sheet.cell_value(i,j)!=''):
                valid_values+=[sheet.cell_value(i, 0)]

        therepeautic= sheet.cell_value(0,j)
        print("""if (document.getElementById(\""""+therepeautic.strip()+"""\").checked) { """)
        list=valid_values
        for i in range(0,len(list)):
            if(" " in list[i]):
                list[i]=list[i].replace(" ","\\\\ ")
            list[i]="#"+list[i]
        output= ",".join(list)
        output="""document.querySelectorAll(\" """+output+"""\").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})"""
        print(output)
        print("}")
