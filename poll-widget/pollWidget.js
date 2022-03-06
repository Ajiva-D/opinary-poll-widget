(async () => {
	let res = await fetch(document.currentScript.dataset.config);
	let config = await res.json()
	let mapInputs = () => {
		let inputsCon = document.createElement("div");
		for (let i = 0; i < config.options.length; i++) {
			inputsCon.innerHTML += `<input type="checkbox" name="poll" id=${config.options[i].id}/>`
		}
		return inputsCon.outerHTML || new XMLSerializer().serializeToString(inputsCon);
	}
	let mapLabels = () => {
		let inputsCon = document.createElement("div");
		for (let i = 0; i < config.options.length; i++) {
			inputsCon.innerHTML += `	<label for=${config.options[i].id} id=${config.options[i].id}>
			<div class="row">
				<div class="column">
					<span class="circle"></span>
					<span class="text">${config.options[i].option}</span>
				</div>
				<span class="percent" id="percent_${config.options[i].id}">${config.options[i].percent}%</span>
			</div>
			<div class="progress" id="progress_${config.options[i].id}" style='--w:${config.options[i].percent};'></div>
		</label>`
		}
		return inputsCon.outerHTML || new XMLSerializer().serializeToString(inputsCon);
	}

	const Widget = Object.create({
		create() {
			const wdg = document.querySelector(".poll-widget");
			wdg.innerHTML = `<div class="wrapper">
		<header>${config.question}</header>
		<div class="poll-area">
		${mapInputs()}
		${mapLabels()}
		</div>
	</div>`;
			return wdg;
		}
	});

	const updatePollScore = (options) => {
		let polls = document.querySelectorAll('label');

		for (let i = 0; i < polls.length; i++) {
			let labelId = polls[i].getAttribute("id");
			let thisPoll = options.find((poll) => poll.id == labelId)
			console.log(document.querySelector(`#percent_${labelId}`));
			document.querySelector(`#percent_${labelId}`).innerText = `${thisPoll.percent}%`
			document.querySelector(`#progress_${labelId}`).style = `--w:${thisPoll.percent}`
		}
	}

	const myWidgetInstance = Widget.create();
	const options = document.querySelectorAll("label");
	for (let i = 0; i < options.length; i++) {
		options[i].addEventListener("click", (e) => {
			let elemId = e.target.getAttribute("id")
			let pollsScore = JSON.parse(localStorage.getItem(`widgetPollsData_${config.pollID}`));
			if (!pollsScore) {
				localStorage.setItem(`widgetPollsData_${config.pollID}`, JSON.stringify({}));
				pollsScore = {}
			}
			let totalVotes = pollsScore.totalVotes ? pollsScore.totalVotes : 0;
			let pollOptions = pollsScore.pollVotes ? pollsScore.pollVotes : config.options
			totalVotes += 1;
			pollsScore.totalVotes = totalVotes;
			for (let opt = 0; opt < pollOptions.length; opt++) {
				pollOptions[opt].votes ? pollOptions[opt].votes : pollOptions[opt].votes = 0
				if (elemId == pollOptions[opt].id) {
					pollOptions[opt].votes += 1
				}
				pollOptions[opt].percent = (pollOptions[opt].votes / totalVotes) * 100

			}
			updatePollScore(pollOptions)
			pollsScore.pollVotes = pollOptions
			localStorage.setItem(`widgetPollsData_${config.pollID}`, JSON.stringify(pollsScore));

			for (let j = 0; j < options.length; j++) {
				if (options[j].classList.contains("selected")) {
					options[j].classList.remove("selected");
				}
			}

			options[i].classList.add("selected");
			for (let k = 0; k < options.length; k++) {
				options[k].classList.add("selectall");
			}

			let forVal = options[i].getAttribute("for");
			let selectInput = document.querySelector("#" + forVal);
			let getAtt = selectInput.getAttribute("type");
			if (getAtt == "checkbox") {
				selectInput.setAttribute("type", "radio");
			} else if (selectInput.checked == true) {
				options[i].classList.remove("selected");
				selectInput.setAttribute("type", "checkbox");
			}

			let array = [];
			for (let l = 0; l < options.length; l++) {
				if (options[l].classList.contains("selected")) {
					array.push(l);
				}
			}
			if (array.length == 0) {
				for (let m = 0; m < options.length; m++) {
					options[m].removeAttribute("class");
				}
			}
		});
	}
	document.getElementById(id).appendChild(myWidgetInstance);
})();