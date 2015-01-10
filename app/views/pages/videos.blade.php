@extends('layouts.master')


@section('title')

Videos

@stop


@section('content')


<div class="container" ng-controller="VideoController">

	<div class="active-video-container">

		<!-- <iframe src="" frameborder="0" allowfullscreen></iframe> -->

		@{{ activeVideo.link }}

	</div>

	<h2 class="active-video-title">@{{ activeVideo.title }}</h2>
	<p class="active-video-description">@{{ activeVideo.description }}</p>

	<div class="video-thumbnail-container">

		<div class="video-thumbnail square" ng-repeat="video in videos" ng-click="setActiveVideo($index)">

			<i class="fa fa-play"></i>

			<div class="video-thumbnail-info-container">

				<h4 class="video-thumbnail-title">@{{ video.title }}</h4>
				<p class="video-thumbnail-description">@{{ video.description | limitTo : 50 }}</p>

			</div>
			

		</div>
		

	</div>

</div>

<div class="banner footer-banner"></div>


@stop