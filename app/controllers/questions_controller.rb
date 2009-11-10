class QuestionsController < ApplicationController
  # GET /questions
  # GET /questions.xml
  def index
    @questions = Question.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @questions }
    end
  end

  # GET /questions/1
  # GET /questions/1.xml
  # def show
  #   @question = Question.find(params[:id])
  # 
  #   respond_to do |format|
  #     format.html # show.html.erb
  #     format.xml  { render :xml => @question }
  #   end
  # end
  
  def show
    #if user_owns_id?(id)
      @question = Question.find(params[:id])
      @items = @question.items
      @right_choice_text = @question.right_choice_text
      @left_choice_text = @question.left_choice_text
      #id = @question_internal.pairwise_id
      # set_pairwise_from_question_id(id)
      # @id, @question, @items_count, @votes_count, all_items = Pairwise.get_question(id)
      # @items = all_items.to_i > 0 ? Pairwise.list_items(@id, nil, true) : []
      # @items = @items.sort_by { |el| el[2] }.reverse
      # votes = Pairwise.list_votes(id, nil, 100)
      # @ip_percents = ip_percents(votes, false)
      # @label = t('items.total')
      # @explain = t('questions.map_explanation')
      # @named_url = named_url_for_question(@question_internal)
    # else
    #   reset_user
    #   flash[:error] = t('error.permission_question')
    #   redirect_to login_path
    # end
  end

  # GET /questions/new
  # GET /questions/new.xml
  def new
    @question = Question.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @question }
    end
  end

  # GET /questions/1/edit
  def edit
    @question = Question.find(params[:id])
  end

  # POST /questions
  # POST /questions.xml
  def create
    @question = Question.new(params[:question])

    respond_to do |format|
      if @question.save
        flash[:notice] = 'Question was successfully created.'
        format.html { redirect_to(@question) }
        format.xml  { render :xml => @question, :status => :created, :location => @question }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @question.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /questions/1
  # PUT /questions/1.xml
  def update
    @question = Question.find(params[:id])

    respond_to do |format|
      if @question.update_attributes(params[:question])
        flash[:notice] = 'Question was successfully updated.'
        format.html { redirect_to(@question) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @question.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /questions/1
  # DELETE /questions/1.xml
  def destroy
    @question = Question.find(params[:id])
    @question.destroy

    respond_to do |format|
      format.html { redirect_to(questions_url) }
      format.xml  { head :ok }
    end
  end
end