/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
;(function (undefined) {
	'use strict';

	if (!window.Wicket) {
		window.Wicket = {};
	}

	if (Wicket.AjaxDownload) {
		return;
	}

	Wicket.AjaxDownload = {
		initiate : function(settings) {
			
			var frame = jQuery("<iframe>").hide().prop("src", settings.url).appendTo("body");
			
			var checkComplete = function() {
				var result;
				
				if (document.cookie.indexOf(settings.name + '=') > -1) {
					result = "success";
				} else {
					var html = frame.contents().find('body').html();
					if (html && html.length) {
						result = "failed";
					}
				}

				if (result) {
					setTimeout(function() { frame.remove(); }, 0);
					
					settings.attributes.ep = settings.attributes.ep || {};
					settings.attributes.ep['result'] = result;
					Wicket.Ajax.ajax(settings.attributes);
				} else {
					setTimeout(checkComplete, 100);
				}
			}; 
			
			checkComplete();
		}
	}; 
	
})();