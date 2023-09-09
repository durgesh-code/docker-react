<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes" />
	<title>ONLYOFFICEEEEEE</title>
	<link rel="icon" href="/static/images/word.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="/static/css/editor.css" />
</head>

<body>
	<div class="form">
		<div id="iframeEditor">
		</div>
	</div>
	<script type="text/javascript" src="http://localhost:80/web-apps/apps/api/documents/api.js"></script>
	<script type="text/javascript" language="javascript">
		var docEditor;
        var config;

        var innerAlert = function (message, inEditor) {
            if (console && console.log)
                console.log(message);
            if (inEditor && docEditor)
                docEditor.showMessage(message);
        };

        // the application is loaded into the browser
        var onAppReady = function () {
            innerAlert("Document editor ready");
        };

        // the document is modified
        var onDocumentStateChange = function (event) {
            var title = document.title.replace(/\*$/g, "");
            document.title = title + (event.data ? "*" : "");
        };

        // the user is trying to switch the document from the viewing into the editing mode
        var onRequestEditRights = function () {
            location.href = location.href.replace(RegExp("mode=view\&?", "i"), "");
        };

        // an error or some other specific event occurs
        var onError = function (event) {
            if (event)
                innerAlert(event.data);
        };

        // the document is opened for editing with the old document.key value
        var onOutdatedVersion = function (event) {
            location.reload(true);
        };

        // replace the link to the document which contains a bookmark
        var replaceActionLink = function(href, linkParam) {
            var link;
            var actionIndex = href.indexOf("&actionLink=");
            if (actionIndex != -1) {
                var endIndex = href.indexOf("&", actionIndex + "&actionLink=".length);
                if (endIndex != -1) {
                    link = href.substring(0, actionIndex) + href.substring(endIndex) + "&actionLink=" + encodeURIComponent(linkParam);
                } else {
                    link = href.substring(0, actionIndex) + "&actionLink=" + encodeURIComponent(linkParam);
                }
            } else {
                link = href + "&actionLink=" + encodeURIComponent(linkParam);
            }
            return link;
        }

        // the user is trying to get link for opening the document which contains a bookmark, scrolling to the bookmark position
        var onMakeActionLink = function (event) {
            var actionData = event.data;
            var linkParam = JSON.stringify(actionData);
            docEditor.setActionLink(replaceActionLink(location.href, linkParam));  // set the link to the document which contains a bookmark
        };

        // the meta information of the document is changed via the meta command
        var onMetaChange = function (event) {
            if (event.data.favorite) {
                var favorite = !!event.data.favorite;
                var title = document.title.replace(/^\☆/g, "");
                document.title = (favorite ? "☆" : "") + title;
                docEditor.setFavorite(favorite);  // change the Favorite icon state
            }

            innerAlert("onMetaChange: " + JSON.stringify(event.data));
        };

        // the user is trying to insert an image by clicking the Image from Storage button
        var onRequestInsertImage = function(event) {
            docEditor.insertImage({  // insert an image into the file
                "c": event.data.c,
                "fileType": "png", "url": "http://web:8000static/images/logo.png", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlVHlwZSI6InBuZyIsInVybCI6Imh0dHA6Ly93ZWI6ODAwMHN0YXRpYy9pbWFnZXMvbG9nby5wbmcifQ.1mEeN2-7sAyVrIqXcYmkziOeS_e3EKfJ29mFAlunR-E"
            })
        };

        // the user is trying to select document for comparing by clicking the Document from Storage button
        var onRequestCompareFile = function() {
            docEditor.setRevisedFile({'fileType': 'docx', 'url': 'http://web:8000static/sample.docx', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlVHlwZSI6ImRvY3giLCJ1cmwiOiJodHRwOi8vd2ViOjgwMDBzdGF0aWMvc2FtcGxlLmRvY3gifQ.pkJ56D8VDDycpTQMumdnJ7uo2O3VpNhHUBGm1a_EMCY'});  // select a document for comparing
        };

        // the user is trying to select recipients data by clicking the Mail merge button
        var onRequestMailMergeRecipients = function (event) {
            docEditor.setMailMergeRecipients(  // insert recipient data for mail merge into the file
                {"fileType": "csv", "url": "http://web:8000csv", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlVHlwZSI6ImNzdiIsInVybCI6Imh0dHA6Ly93ZWI6ODAwMGNzdiJ9.ctXpXinAHG-D8r6Pt0xJScfHpKXLg_rTuTNfxdEWtLE"}
            );
        };

        var onRequestSaveAs = function (event) {  //  the user is trying to save file by clicking Save Copy as... button
            var title = event.data.title;
            var url = event.data.url;
            var data = {
                title: title,
                url: url
            };
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "saveas");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.onload = function () {
                innerAlert(xhr.responseText);
                innerAlert(JSON.parse(xhr.responseText).file, true);
            }
        };

        var onRequestRename = function(event) { //  the user is trying to rename file by clicking Rename... button
            innerAlert("onRequestRename: " + JSON.stringify(event.data));

            var newfilename = event.data;
            var data = {
                newfilename: newfilename,
                dockey: config.document.key,
                ext: config.document.fileType
            };
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "rename");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.onload = function () {
                innerAlert(xhr.responseText);
            }
        };

        var connectEditor = function () {

            config = {'type': 'desktop', 'documentType': 'word', 'document': {'title': 'Admin_v5_issues_220723-2023-09-07T120319.docx', 'url': 'http://web:8000//media/Admin_v5_issues_220723-2023-09-07T120319.docx', 'directUrl': '', 'fileType': 'docx', 'key': '3628812119009144352', 'info': {'owner': 'Me', 'uploaded': '08.09.2023 09:37:17', 'favorite': True}, 'permissions': {'comment': True, 'copy': True, 'download': True, 'edit': True, 'print': 'print', 'fillForms': True, 'modifyFilter': True, 'modifyContentControl': True, 'review': True, 'chat': True, 'reviewGroups': None, 'commentGroups': None, 'userInfoGroups': None}}, 'editorConfig': {'actionLink': None, 'mode': 'edit', 'lang': 'en', 'callbackUrl': 'http://web:8000/track?filename=Admin_v5_issues_220723-2023-09-07T120319.docx&userAddress=172.22.0.1', 'coEditing': None, 'createUrl': 'http://web:8000/create?fileType=desktop', 'templates': [{'image': '', 'title': 'Blank', 'url': 'http://web:8000/create?fileType=desktop'}, {'image': 'http://web:8000/static/images/file_docx.svg', 'title': 'With sample content', 'url': 'http://web:8000/create?fileType=desktop&sample=true'}], 'user': {'id': 1, 'name': 'durgesh yadav'}, 'embedded': {'saveUrl': 'http://web:8000//media/Admin_v5_issues_220723-2023-09-07T120319.docx', 'embedUrl': 'http://web:8000//media/Admin_v5_issues_220723-2023-09-07T120319.docx', 'shareUrl': 'http://web:8000//media/Admin_v5_issues_220723-2023-09-07T120319.docx', 'toolbarDocked': 'top'}, 'customization': {'about': True, 'comments': True, 'feedback': True, 'forcesave': False, 'submitForm': False, 'goback': {'url': 'http://web:8000'}}}, 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZGVza3RvcCIsImRvY3VtZW50VHlwZSI6IndvcmQiLCJkb2N1bWVudCI6eyJ0aXRsZSI6IkFkbWluX3Y1X2lzc3Vlc18yMjA3MjMtMjAyMy0wOS0wN1QxMjAzMTkuZG9jeCIsInVybCI6Imh0dHA6Ly93ZWI6ODAwMC8vbWVkaWEvQWRtaW5fdjVfaXNzdWVzXzIyMDcyMy0yMDIzLTA5LTA3VDEyMDMxOS5kb2N4IiwiZGlyZWN0VXJsIjoiIiwiZmlsZVR5cGUiOiJkb2N4Iiwia2V5IjoiMzYyODgxMjExOTAwOTE0NDM1MiIsImluZm8iOnsib3duZXIiOiJNZSIsInVwbG9hZGVkIjoiMDguMDkuMjAyMyAwOTozNzoxNyIsImZhdm9yaXRlIjp0cnVlfSwicGVybWlzc2lvbnMiOnsiY29tbWVudCI6dHJ1ZSwiY29weSI6dHJ1ZSwiZG93bmxvYWQiOnRydWUsImVkaXQiOnRydWUsInByaW50IjoicHJpbnQiLCJmaWxsRm9ybXMiOnRydWUsIm1vZGlmeUZpbHRlciI6dHJ1ZSwibW9kaWZ5Q29udGVudENvbnRyb2wiOnRydWUsInJldmlldyI6dHJ1ZSwiY2hhdCI6dHJ1ZSwicmV2aWV3R3JvdXBzIjpudWxsLCJjb21tZW50R3JvdXBzIjpudWxsLCJ1c2VySW5mb0dyb3VwcyI6bnVsbH19LCJlZGl0b3JDb25maWciOnsiYWN0aW9uTGluayI6bnVsbCwibW9kZSI6ImVkaXQiLCJsYW5nIjoiZW4iLCJjYWxsYmFja1VybCI6Imh0dHA6Ly93ZWI6ODAwMC90cmFjaz9maWxlbmFtZT1BZG1pbl92NV9pc3N1ZXNfMjIwNzIzLTIwMjMtMDktMDdUMTIwMzE5LmRvY3gmdXNlckFkZHJlc3M9MTcyLjIyLjAuMSIsImNvRWRpdGluZyI6bnVsbCwiY3JlYXRlVXJsIjoiaHR0cDovL3dlYjo4MDAwL2NyZWF0ZT9maWxlVHlwZT1kZXNrdG9wIiwidGVtcGxhdGVzIjpbeyJpbWFnZSI6IiIsInRpdGxlIjoiQmxhbmsiLCJ1cmwiOiJodHRwOi8vd2ViOjgwMDAvY3JlYXRlP2ZpbGVUeXBlPWRlc2t0b3AifSx7ImltYWdlIjoiaHR0cDovL3dlYjo4MDAwL3N0YXRpYy9pbWFnZXMvZmlsZV9kb2N4LnN2ZyIsInRpdGxlIjoiV2l0aCBzYW1wbGUgY29udGVudCIsInVybCI6Imh0dHA6Ly93ZWI6ODAwMC9jcmVhdGU_ZmlsZVR5cGU9ZGVza3RvcCZzYW1wbGU9dHJ1ZSJ9XSwidXNlciI6eyJpZCI6MSwibmFtZSI6ImR1cmdlc2ggeWFkYXYifSwiZW1iZWRkZWQiOnsic2F2ZVVybCI6Imh0dHA6Ly93ZWI6ODAwMC8vbWVkaWEvQWRtaW5fdjVfaXNzdWVzXzIyMDcyMy0yMDIzLTA5LTA3VDEyMDMxOS5kb2N4IiwiZW1iZWRVcmwiOiJodHRwOi8vd2ViOjgwMDAvL21lZGlhL0FkbWluX3Y1X2lzc3Vlc18yMjA3MjMtMjAyMy0wOS0wN1QxMjAzMTkuZG9jeCIsInNoYXJlVXJsIjoiaHR0cDovL3dlYjo4MDAwLy9tZWRpYS9BZG1pbl92NV9pc3N1ZXNfMjIwNzIzLTIwMjMtMDktMDdUMTIwMzE5LmRvY3giLCJ0b29sYmFyRG9ja2VkIjoidG9wIn0sImN1c3RvbWl6YXRpb24iOnsiYWJvdXQiOnRydWUsImNvbW1lbnRzIjp0cnVlLCJmZWVkYmFjayI6dHJ1ZSwiZm9yY2VzYXZlIjpmYWxzZSwic3VibWl0Rm9ybSI6ZmFsc2UsImdvYmFjayI6eyJ1cmwiOiJodHRwOi8vd2ViOjgwMDAifX19fQ.F9LFeTbNBd5J9S2spOfjG2ltOSEN0ce3a65TTJSMKeo'}
            config.width = "100%";
            config.height = "100%";
            config.events = {
                'onAppReady': onAppReady,
                'onDocumentStateChange': onDocumentStateChange,
                'onRequestEditRights': onRequestEditRights,
                'onError': onError,
                'onOutdatedVersion': onOutdatedVersion,
                'onMakeActionLink': onMakeActionLink,
                'onMetaChange': onMetaChange,
                'onRequestInsertImage': onRequestInsertImage,
                'onRequestCompareFile': onRequestCompareFile,
                "onRequestMailMergeRecipients": onRequestMailMergeRecipients,
            };

            

            if (config.editorConfig.user.id) {

                

                // add mentions for not anonymous users
                config.events['onRequestUsers'] = function () {
                    docEditor.setUsers({  // set a list of users to mention in the comments
                        "users": null
                    });
                };
                // the user is mentioned in a comment
                config.events['onRequestSendNotify'] = function (event) {
                    event.data.actionLink = replaceActionLink(location.href, JSON.stringify(event.data.actionLink));
                    var data = JSON.stringify(event.data);
                    innerAlert("onRequestSendNotify: " + data);
                };
                // prevent file renaming for anonymous users
                config.events['onRequestRename'] = onRequestRename;

            }

            if (config.editorConfig.createUrl) {
                config.events.onRequestSaveAs = onRequestSaveAs;
            };

            if ((config.document.fileType === "docxf" || config.document.fileType === "oform")
                && DocsAPI.DocEditor.version().split(".")[0] < 7) {
                innerAlert("Please update ONLYOFFICE Docs to version 7.0 to work on fillable forms online.");
                return;
            }

            docEditor = new DocsAPI.DocEditor("iframeEditor", config);

            fixSize();
        };

        // get the editor sizes
        var fixSize = function () {
            var wrapEl = document.getElementsByClassName("form");
            if (wrapEl.length) {
                wrapEl[0].style.height = screen.availHeight + "px";
                window.scrollTo(0, -1);
                wrapEl[0].style.height = window.innerHeight + "px";
            }
        };

        if (window.addEventListener) {
            window.addEventListener("load", connectEditor);
            window.addEventListener("resize", fixSize);
        } else if (window.attachEvent) {
            window.attachEvent("onload", connectEditor);
            window.attachEvent("onresize", fixSize);
        }

	</script>
</body>

</html>