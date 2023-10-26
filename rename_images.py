import os

folder_path = "imgs_temp"

# Start and end numbers for the images to be renamed
start_num = 376
end_num = 602

for num in range(start_num, end_num + 1):
    old_name = os.path.join(folder_path, f"{num}.png")
    new_name = os.path.join(folder_path, f"{num-1}.png")
    
    if os.path.exists(old_name):
        os.rename(old_name, new_name)
    else:
        print(f"File {old_name} does not exist.")

print("Renaming complete!")