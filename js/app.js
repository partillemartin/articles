(function(){

	var ArticleManager = {
		init: function(config) {
			this.url = 'http://api.feedzilla.com/v1/categories/26/articles.json';
			this.template = config.template;
			this.fetch();
		},

		attachTemplate: function() {
			var template = Handlebars.compile(this.template);
			var html = template(this.articles);

			$('#container').append(html);

			$('article').on('click', function(){
				ArticleManager.setFeatured($(this).data('index'));
			});
			
		},

		fetch: function() {

			var self = this;

			$.getJSON(this.url, function(data) {
				console.log(data);
				self.articles = $.map(data.articles, function(article, index) {
					return {
						title: article.title,
						author: article.author,
						article: article.summary,
						url: article.url,
						publish_date: article.publish_date,
						index: index
					}
				});
				self.attachTemplate();
			});
			
		},

		setFeatured: function(index) {
			var el = $('#featured');
			el.find('h1').html(ArticleManager.articles[index].title);
			el.find('p.article').html(ArticleManager.articles[index].article);
			var anchor = $('<a href="' + ArticleManager.articles[index].url + '">Read full article</a>');
			el.find('p.url').html('');
			el.find('p.url').append(anchor);
		}
	}

	ArticleManager.init({
		template: $('#template').html()
	});

})();