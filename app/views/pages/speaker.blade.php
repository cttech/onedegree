@extends('layouts.master')


@section('tab')
Request Us To Speak - One Degree Advisors
@stop


@section('content')

	@section('content')


		<div class="inquiry-banner top-banner">

			<div class="inquiry-form-container">


				{{ Form::open(['class' => 'inquiry-form']) }}

					<h2 class="form-title"><span class="bold">Hello,</span><br>Thank you for your interest in our program. Fill out the form below to proceed:</h2>

					<div>

						<p>{{ Form::text('name') }}</p>
						<p>{{ Form::label('name', 'NAME') }}</p>

					</div>
					
					<div>

						<p>{{ Form::text('email') }}</p>
						<p>{{ Form::label('email', 'EMAIL') }}</p>

					</div>
					
					<div>

						<p>{{ Form::text('business-name') }}</p>
						<p>{{ Form::label('business-name', 'BUSINESS NAME') }}</p>

					</div>
					
					<div>

						<p>{{ Form::text('phone') }}</p>
						<p>{{ Form::label('phone', 'PHONE NUMBER') }}</p>

					</div>
					
					<div>

						<p>{{ Form::text('location') }}</p>
						<p>{{ Form::label('location', 'CITY, STATE') }}</p>

					</div>
					
					<div>

						<p>{{ Form::textarea('description') }}</p>
						<p>{{ Form::label('description', 'TELL US ABOUT YOURSELF (140 CHARACTERS OR LESS)') }}</p>

					</div>
					

					<!-- <div class="inquiry-form-button">

						<p>CANCEL</p>

					</div> -->
					<div class="inquiry-form-button ">

						<p>SEND INQUIRY</p>

					</div>

				{{ Form::close() }}

			</div>


		</div>
		

	@stop

@stop