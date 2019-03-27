import os
path = '.\\skipforfun-Copy\\'
counter = 0
for file in os.listdir(path):
    if os.path.isfile(os.path.join(path,file))==True:
        newname=str(counter)+'.png'
        counter = counter + 1
        os.rename(os.path.join(path,file),os.path.join(path,newname))
        print file,'ok'

print 'aaa'
