Jekyll::Hooks.register :site, :post_write do |site|
    site.tags.each do |tag, posts|
      dir = File.join(site.dest, '_tags', Jekyll::Utils.slugify(tag))
      unless File.exist?(dir)
        FileUtils.mkdir_p(dir)
      end
      File.open(File.join(dir, 'index.html'), 'w') do |file|
        content = "<h1>#{tag}</h1><ul>"
        posts.each do |post|
          content += "<li><a href='#{site.baseurl}#{post.url}'>#{post.title}</a></li>"
        end
        content += "</ul>"
        file.write(content)
      end
    end
  end
  
  