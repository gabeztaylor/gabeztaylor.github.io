Jekyll::Hooks.register :site, :post_write do |site|
    site.tags.keys.each do |tag|
      FileUtils.mkdir_p(File.join(site.dest, 'tags', tag))
      File.open(File.join(site.dest, 'tags', tag, 'index.html'), 'w') do |file|
        site.pages << Jekyll::PageWithoutAFile.new(site, site.dest, File.join('tags', tag), "index.html")
        page = site.pages.last
        page.data['layout'] = 'tag_page'
        page.data['tag'] = tag
        page.content = "{% for post in site.tags['#{tag}'] %}<li><a href='{{ post.url }}'>{{ post.title }}</a></li>{% endfor %}"
        page.output = Jekyll::Renderer.new(site, page).run
        file.puts page.output
      end
    end
  end
  