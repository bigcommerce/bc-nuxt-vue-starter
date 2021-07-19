MAIN_VARS="HOST='0.0.0.0' NODE_ENV='production'"
# ENV_VARS=$(grep -v '#.*' .env)
CMD="heroku config:set"
QUERY="$CMD $MAIN_VARS";
eval $QUERY;
