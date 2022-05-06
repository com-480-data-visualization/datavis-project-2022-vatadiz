import wget
import requests
import pandas as pd
import time
import os

url = "https://ballchasing.com/api/"

headers = {
    'Authorization': 'AL6anmMkbMBahaqpBCd2pZL4G6D7fOYyAnMT7kFo',
}
get_file_url = lambda id: f"https://ballchasing.com/api/replays/{id}/file"

DOWNLOAD_FOLDER = "data/replays/winter-major/"

def download_file(id, time_delay=1.1, verbose=False):
    "Time delay is important, look at the api to see what is the authorized speed"
    r = requests.get(get_file_url(id), headers=headers)
    if verbose:
        print(r, id)
    if r.status_code == 200:
        open(DOWNLOAD_FOLDER + id + ".replay", 'wb').write(r.content)
    else:
        print(f"Nothing was done since status code = {r.status_code}")
    time.sleep(time_delay)

def download_files(id_list, time_delay=1.1, verbose=False):
    "Time delay is important, look at the api to see what is the authorized speed"
    for id in id_list:
        download_file(id, time_delay=time_delay, verbose=verbose)
        

if __name__ == "__main__":
    filename = "data/rlcs-202122/winter-major/main_wmajor.csv" 
    if not os.path.exists(DOWNLOAD_FOLDER):
        os.makedirs(DOWNLOAD_FOLDER)
    df = pd.read_csv(filename)
    ids = df.ballchasing_id 
    ids = ids[ids.notna()]
    
    # In case of error, copy the last successful id, 
    # to continue your progression
    last_successful_id = None
    # last_successful_id = "ea967e90-9362-442d-9879-d67a323a94ca" 

    if last_successful_id is not None:
        prog = ids.str.find(last_successful_id)
        prog = prog[prog >= 0]
        prog_idx = prog.index[0]

        ids = ids[ids.index > prog_idx]
      
    # Downloading file restrictions:
    # 1 call/second, 200/hour

    download_files(ids.tolist(), verbose=True)
    



    
    
    