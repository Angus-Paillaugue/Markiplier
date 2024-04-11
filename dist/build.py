import shutil
import os

shutil.make_archive(os.path.join(os.path.dirname(os.path.realpath(__file__)), "./build"), 'zip', os.path.join(os.path.dirname(os.path.realpath(__file__)), "../"))