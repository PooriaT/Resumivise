import os
import datetime

def find_files_created_prior_to_today(directory):
    today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

    for root, dirs, files in os.walk(directory):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            
            created_time = datetime.datetime.fromtimestamp(os.path.getctime(file_path)).replace(hour=0, minute=0, second=0, microsecond=0)

            if created_time < today:
                os.remove(file_path)


if __name__ == '__main__':
    directory_to_search = '../static/resume'
    find_files_created_prior_to_today(directory_to_search)
