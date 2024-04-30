import os
import re

# Path to your posts
posts_directory = '_posts'
tags_directory = '_tags'
if not os.path.exists(tags_directory):
    os.makedirs(tags_directory)

# Collect all tags
tags = set()
for filename in os.listdir(posts_directory):
    with open(os.path.join(posts_directory, filename), 'r') as file:
        content = file.read()
        found_tags = re.findall(r'tags:\s*\[(.*?)\]', content)
        if found_tags:
            tags.update(tag.strip() for tag in found_tags[0].split(','))

# Create tag files
for tag in tags:
    tag_filename = os.path.join(tags_directory, f"{tag.lower().replace(' ', '-')}.md")
    if not os.path.exists(tag_filename):
        with open(tag_filename, 'w') as file:
            file.write(f"---\nlayout: tag\ntag: {tag}\npermalink: /tags/{tag.lower().replace(' ', '-')}/\n---")

print(f"Generated {len(tags)} tag pages.")
