#%%

import pandas as pd

# %%

places = pd.read_json("places.json")
places.to_csv("places.csv")

